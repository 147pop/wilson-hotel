#!/usr/bin/env python3
"""Reintenta subir a Purelymail los .eml locales cuya cantidad no coincide con el servidor,
identificando por Message-ID cuales faltan (evita duplicar lo que ya subio)."""

import imaplib
import os
import sys
import email
import email.utils
import time

IMAP_SERVER = "imap.purelymail.com"
IMAP_PORT = 993

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backup-mail")


def remote_message_ids(imap, folder):
    imap.select(folder, readonly=True)
    status, data = imap.uid("SEARCH", None, "ALL")
    ids = set()
    uids = data[0].split()
    for uid in uids:
        status, msg_data = imap.uid("FETCH", uid, "(BODY.PEEK[HEADER.FIELDS (MESSAGE-ID)])")
        if status == "OK" and msg_data and msg_data[0]:
            header = msg_data[0][1].decode("utf-8", errors="replace")
            mid = header.split(":", 1)[-1].strip() if "Message-ID" in header or "Message-Id" in header else ""
            if mid:
                ids.add(mid)
    return ids


def main():
    account, user, password, local_folder, remote_folder = sys.argv[1:6]
    folder_dir = os.path.join(BACKUP_DIR, account, local_folder)

    imap = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
    imap.login(user, password)
    print("Login OK, leyendo Message-IDs remotos...")

    remote_ids = remote_message_ids(imap, remote_folder)
    print(f"{len(remote_ids)} mensajes en servidor")

    files = sorted(f for f in os.listdir(folder_dir) if f.endswith(".eml"))
    missing = []
    for fname in files:
        path = os.path.join(folder_dir, fname)
        with open(path, "rb") as f:
            raw = f.read()
        msg = email.message_from_bytes(raw)
        mid = msg.get("Message-ID", "").strip()
        if mid not in remote_ids:
            missing.append((fname, raw, msg))

    print(f"{len(missing)} faltantes localmente que no estan en servidor")

    ok, err = 0, 0
    for fname, raw, msg in missing:
        date_tuple = email.utils.parsedate_tz(msg.get("Date"))
        if date_tuple:
            timestamp = email.utils.mktime_tz(date_tuple)
            date_time = imaplib.Time2Internaldate(timestamp)
        else:
            date_time = imaplib.Time2Internaldate(time.time())
        try:
            status, data = imap.append(remote_folder, None, date_time, raw)
            if status == "OK":
                ok += 1
                print(f"  OK {fname}")
            else:
                err += 1
                print(f"  ERROR {fname}: {status} {data}")
        except Exception as e:
            err += 1
            print(f"  ERROR {fname}: {e}")

    imap.logout()
    print(f"\nTOTAL reintento: {ok} OK, {err} errores")


if __name__ == "__main__":
    main()
