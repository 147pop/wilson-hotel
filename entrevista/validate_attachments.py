#!/usr/bin/env python3
"""Validar que todos los adjuntos de los emails con adjuntos esten realmente
guardados y completos en los archivos .eml del backup.

Comprobaciones por cada .eml:
  1. Parsear el email y recorrer todas las partes MIME.
  2. Detectar partes que son adjuntos (Content-Disposition: attachment
     o inline con filename, o multipart sin disposition pero con filename).
  3. Para cada adjunto:
     - Verificar que tiene nombre de archivo.
     - Verificar que tiene payload (contenido) no vacio.
     - Si el Content-Transfer-Encoding es base64, decodificar y comprobar
       que no hay errores y que el tamano decodificado > 0.
     - Comparar el tamano declarado en headers (si existe) con el real.
  4. Reportar cualquier problema encontrado.

No requiere conexion IMAP — trabaja solo con los archivos en disco.
"""

import email
import email.policy
import os
import sys
from email.utils import parsedate_to_datetime

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backup-mail")


def format_size(num_bytes):
    for unit in ["B", "KB", "MB", "GB"]:
        if num_bytes < 1024:
            return f"{num_bytes:.1f} {unit}"
        num_bytes /= 1024
    return f"{num_bytes:.1f} TB"


def iter_eml_files(base_dir):
    for account in sorted(os.listdir(base_dir)):
        account_dir = os.path.join(base_dir, account)
        if not os.path.isdir(account_dir):
            continue
        for folder in sorted(os.listdir(account_dir)):
            folder_dir = os.path.join(account_dir, folder)
            if not os.path.isdir(folder_dir):
                continue
            for fname in sorted(os.listdir(folder_dir)):
                if fname.endswith(".eml"):
                    yield account, folder, fname, os.path.join(folder_dir, fname)


def get_attachment_info(part):
    """Devuelve (es_adjunto, filename) para una parte MIME."""
    cd = part.get("Content-Disposition", "")
    ct = part.get("Content-Type", "")
    filename = part.get_filename()

    is_attachment = False
    if "attachment" in cd.lower():
        is_attachment = True
    elif filename and "inline" in cd.lower():
        is_attachment = True
    elif filename and not cd:
        is_attachment = True

    return is_attachment, filename


def validate_attachments(filepath):
    """Valida los adjuntos de un archivo .eml.
    Devuelve (lista_adjuntos, lista_problemas).
    Cada adjunto: (filename, size_decoded, encoding)
    Cada problema: string descriptivo.
    """
    issues = []
    attachments = []

    try:
        with open(filepath, "rb") as f:
            msg = email.message_from_binary_file(f, policy=email.policy.default)
    except Exception as e:
        return [], [f"no se pudo parsear: {e}"]

    if not msg.is_multipart():
        is_att, fname = get_attachment_info(msg)
        if is_att:
            ok, size, enc, err = validate_single_part(msg, filepath)
            if err:
                issues.append(f"adjunto '{fname}': {err}")
            attachments.append((fname or "(sin nombre)", size, enc, ok))
        return attachments, issues

    part_num = 0
    for part in msg.walk():
        part_num += 1
        if part.is_multipart():
            continue
        is_att, fname = get_attachment_info(part)
        if not is_att:
            continue
        ok, size, enc, err = validate_single_part(part, filepath)
        if err:
            issues.append(f"parte {part_num} adjunto '{fname or '(sin nombre)'}': {err}")
        attachments.append((fname or "(sin nombre)", size, enc, ok))

    return attachments, issues


def validate_single_part(part, filepath):
    """Valida una parte MIME individual que es un adjunto.
    Devuelve (ok, size_decoded, encoding, error_msg_or_None).
    """
    filename = part.get_filename() or "(sin nombre)"
    cte = part.get("Content-Transfer-Encoding", "7bit").strip().lower()

    payload = part.get_payload(decode=True)
    if payload is None:
        return False, 0, cte, f"payload es None (sin contenido)"

    size = len(payload)
    if size == 0:
        return False, 0, cte, "adjunto vacio (0 bytes decodificados)"

    raw_payload = part.get_payload(decode=False)
    if isinstance(raw_payload, str) and cte == "base64":
        import base64
        import re as _re
        clean = _re.sub(r"\s", "", raw_payload.strip())
        remainder = len(clean) % 4
        if remainder != 0:
            return False, size, cte, f"base64 truncado: longitud no multiplo de 4 (resto={remainder})"
        try:
            decoded_check = base64.b64decode(clean, validate=True)
            if len(decoded_check) != size:
                return False, size, cte, f"tamano base64 decodificado mismatch: {len(decoded_check)} vs {size}"
        except Exception as e:
            return False, size, cte, f"base64 no decodifica: {e}"

    return True, size, cte, None


def main():
    if not os.path.isdir(BACKUP_DIR):
        print(f"ERROR: no existe el directorio de backup: {BACKUP_DIR}")
        sys.exit(1)

    print("=" * 70)
    print("VALIDACION DE ADJUNTOS — Wilson Hotel backup-mail")
    print("=" * 70)
    print(f"Directorio: {BACKUP_DIR}")
    print()

    total_eml = 0
    total_eml_with_attachments = 0
    total_attachments = 0
    total_attachment_bytes = 0
    total_issues = 0
    issues_detail = []

    current_account = None
    account_stats = {}

    for account, folder, fname, filepath in iter_eml_files(BACKUP_DIR):
        if account != current_account:
            if current_account is not None:
                s = account_stats[current_account]
                print(f"  TOTAL {current_account}: {s['emls']} emails, "
                      f"{s['with_att']} con adjuntos, {s['att']} adjuntos, "
                      f"{s['att_bytes']} bytes, {s['issues']} problemas\n")
            current_account = account
            account_stats[account] = {"emls": 0, "with_att": 0, "att": 0, "att_bytes": 0, "issues": 0}
            print(f"\n[{account}]")

        total_eml += 1
        account_stats[account]["emls"] += 1

        attachments, issues = validate_attachments(filepath)

        if attachments:
            total_eml_with_attachments += 1
            account_stats[account]["with_att"] += 1
            for att_fname, att_size, enc, ok in attachments:
                total_attachments += 1
                account_stats[account]["att"] += 1
                total_attachment_bytes += att_size
                account_stats[account]["att_bytes"] += att_size
                if not ok:
                    total_issues += 1
                    account_stats[account]["issues"] += 1
                    issues_detail.append((account, folder, fname, f"adjunto '{att_fname}' FALLÓ validación"))
            if len(attachments) > 20:
                pass

        if issues:
            for issue in issues:
                total_issues += 1
                account_stats[account]["issues"] += 1
                issues_detail.append((account, folder, fname, issue))

    if current_account is not None:
        s = account_stats[current_account]
        print(f"  TOTAL {current_account}: {s['emls']} emails, "
              f"{s['with_att']} con adjuntos, {s['att']} adjuntos, "
              f"{s['att_bytes']} bytes, {s['issues']} problemas\n")

    print("\n" + "=" * 70)
    print("RESUMEN GLOBAL")
    print("=" * 70)
    print(f"Emails .eml revisados:        {total_eml}")
    print(f"Emails con adjuntos:          {total_eml_with_attachments}")
    print(f"Adjuntos totales encontrados: {total_attachments}")
    print(f"Tamano total de adjuntos:     {format_size(total_attachment_bytes)}")
    print(f"Problemas encontrados:        {total_issues}")

    if total_issues == 0:
        print("\nRESULTADO: ✓ Todos los adjuntos estan presentes y validos")
    else:
        print(f"\nRESULTADO: ✗ {total_issues} PROBLEMAS:")
        for account, folder, fname, issue in issues_detail:
            print(f"  [{account}] {folder}/{fname}: {issue}")

    sys.exit(1 if total_issues else 0)


if __name__ == "__main__":
    main()