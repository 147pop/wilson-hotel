#!/usr/bin/env python3
"""Reintenta los .eml que Purelymail rechazo por bloque de headers demasiado grande
(reenvios via Outlook con cientos de headers X-MS-Exchange-AntiSpam-*, ARC-*, etc).
Recorta solo esos headers de scoring/routing internos de Microsoft, preservando
From/To/Subject/Date/Message-ID/body/adjuntos intactos, y reintenta el APPEND."""

import imaplib
import email
import email.utils
import re
import sys
import time

JUNK_HEADER_RE = re.compile(
    rb"^(ARC-|X-MS-Exchange|X-Forefront|X-Microsoft-Antispam|X-OriginatorOrg|"
    rb"X-MS-Office365-Filtering|X-MS-PublicTrafficType|X-MS-TrafficTypeDiagnostic|"
    rb"X-EOP-|X-MS-Oob-TLC-OOBClassifiers|X-MS-Exchange-CrossTenant)",
    re.IGNORECASE,
)


def strip_junk_headers(raw):
    head, sep, body = raw.partition(b"\r\n\r\n")
    lines = head.split(b"\r\n")
    kept = []
    skipping = False
    for line in lines:
        if line[:1] in (b" ", b"\t"):
            if not skipping:
                kept.append(line)
            continue
        skipping = bool(JUNK_HEADER_RE.match(line))
        if not skipping:
            kept.append(line)
    new_head = b"\r\n".join(kept)
    return new_head + sep + body


def main():
    account, user, password, local_folder, remote_folder = sys.argv[1:6]
    import os
    BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backup-mail")
    folder_dir = os.path.join(BACKUP_DIR, account, local_folder)

    imap = imaplib.IMAP4_SSL("imap.purelymail.com", 993)
    imap.login(user, password)
    print("Login OK")

    imap.select(remote_folder, readonly=True)
    status, data = imap.uid("SEARCH", None, "ALL")
    remote_ids = set()
    for uid in data[0].split():
        status, msg_data = imap.uid("FETCH", uid, "(BODY.PEEK[HEADER.FIELDS (MESSAGE-ID)])")
        if status == "OK" and msg_data and msg_data[0]:
            header = msg_data[0][1].decode("utf-8", errors="replace")
            if "Message-ID" in header or "Message-Id" in header:
                mid = header.split(":", 1)[-1].strip()
                if mid:
                    remote_ids.add(mid)
    print(f"{len(remote_ids)} en servidor")

    files = sorted(f for f in os.listdir(folder_dir) if f.endswith(".eml"))
    ok, err = 0, 0
    for fname in files:
        path = os.path.join(folder_dir, fname)
        with open(path, "rb") as f:
            raw = f.read()
        msg = email.message_from_bytes(raw)
        mid = (msg.get("Message-ID") or "").strip()
        if mid in remote_ids:
            continue

        stripped = strip_junk_headers(raw)
        date_tuple = email.utils.parsedate_tz(msg.get("Date"))
        if date_tuple:
            date_time = imaplib.Time2Internaldate(email.utils.mktime_tz(date_tuple))
        else:
            date_time = imaplib.Time2Internaldate(time.time())

        try:
            status, data = imap.append(remote_folder, None, date_time, stripped)
            if status == "OK":
                ok += 1
                print(f"  OK {fname} (headers {len(raw)} -> {len(stripped)} bytes)")
            else:
                err += 1
                print(f"  ERROR {fname}: {status} {data}")
        except Exception as e:
            err += 1
            print(f"  ERROR {fname}: {e}")
        time.sleep(1)

    imap.logout()
    print(f"\nTOTAL: {ok} OK, {err} errores")


if __name__ == "__main__":
    main()
