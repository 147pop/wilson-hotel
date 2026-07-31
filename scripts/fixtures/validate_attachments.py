#!/usr/bin/env python3
"""Valida integridad de adjuntos en los .eml del backup local (backup-mail/).

Recorre cada .eml, extrae las partes marcadas como adjunto (Content-Disposition:
attachment o filename presente), intenta decodificarlas y chequea tamaño > 0.
No toca el servidor IMAP — solo lee lo que ya está en disco.
"""

import email
import email.policy
import os
import sys

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "backup-mail")
if not os.path.isdir(BACKUP_DIR):
    BACKUP_DIR = "/Users/147pop/Documents/GitHub/hotelwilson/backup-mail"


def iter_eml_files(root):
    for dirpath, dirnames, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(".eml"):
                yield os.path.join(dirpath, f)


def check_eml(path):
    """Return (attachment_count, problems) for one .eml file."""
    problems = []
    try:
        with open(path, "rb") as fh:
            msg = email.message_from_binary_file(fh, policy=email.policy.default)
    except Exception as e:
        return 0, [f"no se pudo parsear el .eml: {e}"]

    count = 0
    for part in msg.walk():
        if part.is_multipart():
            continue
        filename = part.get_filename()
        disp = part.get_content_disposition()
        if not filename and disp != "attachment":
            continue
        count += 1
        try:
            payload = part.get_payload(decode=True)
        except Exception as e:
            problems.append(f"adjunto '{filename}': error al decodificar ({e})")
            continue
        if payload is None:
            problems.append(f"adjunto '{filename}': payload None (no decodificable)")
        elif len(payload) == 0:
            problems.append(f"adjunto '{filename}': 0 bytes")
    return count, problems


def main():
    if not os.path.isdir(BACKUP_DIR):
        print(f"ERROR: no existe {BACKUP_DIR}")
        sys.exit(1)

    total_emails = 0
    total_with_attachments = 0
    total_attachments = 0
    total_problem_emails = 0
    all_problems = []

    for path in iter_eml_files(BACKUP_DIR):
        total_emails += 1
        count, problems = check_eml(path)
        if count:
            total_with_attachments += 1
            total_attachments += count
        if problems:
            total_problem_emails += 1
            rel = os.path.relpath(path, BACKUP_DIR)
            for p in problems:
                all_problems.append(f"{rel}: {p}")

    print("=" * 60)
    print("VALIDACIÓN DE ADJUNTOS — backup-mail")
    print("=" * 60)
    print(f"Emails escaneados: {total_emails}")
    print(f"Emails con adjuntos: {total_with_attachments}")
    print(f"Adjuntos totales: {total_attachments}")
    print(f"Emails con problemas: {total_problem_emails}")

    if all_problems:
        print(f"\n✗ {len(all_problems)} PROBLEMAS:")
        for p in all_problems:
            print(f"  {p}")
        sys.exit(1)
    else:
        print("\n✓ Todos los adjuntos decodificaron correctamente y tienen tamaño > 0")
        sys.exit(0)


if __name__ == "__main__":
    main()
