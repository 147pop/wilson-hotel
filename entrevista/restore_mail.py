#!/usr/bin/env python3
"""Restaura backup local (.eml) a una cuenta Purelymail via IMAP APPEND."""

import imaplib
import os
import sys
import email
import email.utils
import time

IMAP_SERVER = "imap.purelymail.com"
IMAP_PORT = 993

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backup-mail")

FOLDER_MAP = {
    "inbox": "INBOX",
    "inbox.sent items": "Sent",
    "inbox.sent messages": "Sent",
    "inbox.trash": "Trash",
    "inbox.deleted messages": "Trash",
    "inbox.drafts": "Drafts",
    "inbox.spam": "Junk",
    "inbox.junk": "Junk",
    "inbox.archive": "Archive",
    "inbox.promociones": "Promociones",
}


def map_remote_folder(local_name):
    return FOLDER_MAP.get(local_name.lower(), local_name)


def restore_folder(imap, folder_dir, remote_folder):
    files = sorted(f for f in os.listdir(folder_dir) if f.endswith(".eml"))
    if not files:
        return 0, 0

    ok, err = 0, 0
    for i, fname in enumerate(files, 1):
        path = os.path.join(folder_dir, fname)
        with open(path, "rb") as f:
            raw = f.read()

        msg = email.message_from_bytes(raw)
        date_tuple = email.utils.parsedate_tz(msg.get("Date"))
        if date_tuple:
            timestamp = email.utils.mktime_tz(date_tuple)
            date_time = imaplib.Time2Internaldate(timestamp)
        else:
            date_time = imaplib.Time2Internaldate(time.time())

        try:
            status, data = imap.append(remote_folder, None, date_time, raw)
            if status != "OK":
                print(f"    ERROR append {fname}: {status} {data}")
                err += 1
            else:
                ok += 1
        except Exception as e:
            print(f"    ERROR append {fname}: {e}")
            err += 1

        if i % 25 == 0 or i == len(files):
            print(f"    {i}/{len(files)} subidos")

    return ok, err


def main():
    if len(sys.argv) != 4:
        print("Uso: restore_mail.py <local_account_dir_name> <imap_user> <imap_pass>")
        sys.exit(1)

    account, user, password = sys.argv[1], sys.argv[2], sys.argv[3]
    account_dir = os.path.join(BACKUP_DIR, account)
    if not os.path.isdir(account_dir):
        print(f"No existe: {account_dir}")
        sys.exit(1)

    imap = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
    imap.login(user, password)
    print(f"Login OK: {user}")

    total_ok, total_err = 0, 0
    for entry in sorted(os.listdir(account_dir)):
        folder_dir = os.path.join(account_dir, entry)
        if not os.path.isdir(folder_dir):
            continue
        if not any(f.endswith(".eml") for f in os.listdir(folder_dir)):
            continue
        remote_folder = map_remote_folder(entry)
        if remote_folder != "INBOX":
            try:
                imap.create(remote_folder)
            except Exception:
                pass
        print(f"\n[{entry}] -> {remote_folder}")
        ok, err = restore_folder(imap, folder_dir, remote_folder)
        total_ok += ok
        total_err += err
        print(f"  {ok} OK, {err} errores")

    imap.logout()
    print(f"\nTOTAL: {total_ok} subidos, {total_err} errores")


if __name__ == "__main__":
    main()
