# Plan de Migración DNS + Correo — wilsonhotel.com.ar

*Última actualización: 2026-07-24*

## Contexto

Se migra el correo de `wilsonhotel.com.ar` a **DonWeb Correo Profesional Plan 10** (ya contratado en cuenta propia de Agustín). El backup incremental de las 9 casillas está hecho y validado (ver `migracion-email-wilson-hotel.md`).

**Estado actual:**
- Nameservers: `ns9.hostmar.com` / `ns10.hostmar.com` (cuenta Revendedor del webmaster)
- Correo en IP `179.43.121.191` (servidor del revendedor)
- Dominio registrado en NIC.ar a nombre de **AGA TURISMO S.A.** (CUIT 30708153911)
- El dueño del hotel tendrá acceso al panel NIC.ar el lunes 28 o martes 29 de julio

**Problema confirmado por DonWeb (ticket 893657, Julia B.):**
- El dominio debe desparkearse del servicio del revendedor antes de poder asociarse al Plan 10
- El desparkeo **elimina** la zona DNS y las casillas del servicio actual
- No se puede ver la config del Plan 10 (IP nueva, DKIM, IMAP/SMTP) hasta después de la asociación
- Cambiar NS a Cloudflare no reemplaza el desparkeo — es un flag interno de DonWeb

**Decisión tomada:** coordinar con el webmaster para que haga el desparkeo/transferencia desde su panel (instantáneo, sin esperar que DonWeb procese documentación).

---

## Cronología de tickets

### Ticket 885816 — Gisela R. (Level 1 Support)
Agustín pidió registros DNS completos (MX, SPF, DKIM, DMARC, autodiscover, IMAP/SMTP) para configurar manualmente en NIC.ar. Respuesta: instructivo genérico incompleto (solo cubre A, MX, SPF — sin DKIM, DMARC, autodiscover, datos IMAP/SMTP).

### Ticket 887581 — Tamara Brizuela (Billing)
El dominio debe estar asociado al Plan 10 antes de configurar DNS. Hoy está vinculado a la cuenta Revendedor del webmaster.

### Ticket 893657 — Julia B. (Support)
Confirmó que:
1. El desparkeo elimina zona DNS + casillas del servicio actual
2. NS en Cloudflare no reemplaza el desparkeo
3. Si no hay contacto con el titular del servicio actual, DonWeb puede gestionar con documentación (estatuto + DNI + captura TAD)

---

## Registros DNS actuales (snapshot 2026-07-23)

```
A     wilsonhotel.com.ar       → 179.43.121.191
A     mail                     → 179.43.121.191
A     mx1                      → 200.58.122.206
A     ftp                      → 179.43.121.191
A     mipanel                  → 200.58.109.42
CNAME www                      → wilsonhotel.com.ar
CNAME autoconfig               → wilsonhotel.com.ar
CNAME autodiscover             → wilsonhotel.com.ar
MX    wilsonhotel.com.ar    0  → mail.wilsonhotel.com.ar
MX    wilsonhotel.com.ar   20  → mx1.wilsonhotel.com.ar
TXT   wilsonhotel.com.ar       → v=spf1 include:spf.hostmar.com -all
TXT   mail._domainkey           → v=DKIM1; g=*; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...
TXT   _dmarc                   → v=DMARC1; p=none
```

---

## Scripts de backup y validación

### `backup_mail.py` — Backup incremental IMAP

Descarga todos los emails como archivos `.eml` (formato RFC822 completo: headers, cuerpo, adjuntos e imágenes inline incluidos). Es incremental — compara UIDs locales vs servidor y solo baja lo nuevo.

```bash
# Ejecutar backup incremental
python3 backup_mail.py

# Destino: ../backup-mail/<cuenta>/<carpeta>/<UID>.eml
```

### `validate_backup.py` — Validación de integridad

Compara UID por UID entre servidor IMAP y disco. Detecta:
- Emails faltantes (en servidor pero no en disco)
- Archivos extra (en disco pero no en servidor)
- Archivos corruptos (vacíos o sin headers válidos)

```bash
# Ejecutar validación
python3 validate_backup.py

# Salida: ✓ BACKUP COMPLETO o lista de problemas
```

---

## Plan paso a paso con fechas

### Fase 0 — Preparación (completada)

| Tarea | Estado | Fecha |
|---|---|---|
| Backup incremental de 9 casillas | ✅ Hecho | 2026-07-23 |
| Validación de integridad (0 faltantes, 0 corruptos) | ✅ Hecho | 2026-07-23 |
| Registros DNS actuales guardados (`dnsrecords.txt`) | ✅ Hecho | 2026-07-23 |
| Cuenta Cloudflare creada | ✅ Hecho | 2026-07-23 |
| Registros replicados en Cloudflare | ✅ Hecho | 2026-07-23 |
| Archivo de importación creado (`cloudflare-import.txt`) | ✅ Hecho | 2026-07-23 |

---

### Fase 1 — Corregir Cloudflare + contactar webmaster

**Cuándo:** Viernes 25 de julio  
**Duración:** 30 minutos  
**Quién:** Agustín

#### 1A. Corregir proxy status en Cloudflare (10 min)

Cloudflare importó todo como Proxied. El proxy solo pasa HTTP/HTTPS — SMTP, IMAP y FTP no funcionan a través de él.

Pasar a **DNS only** (nube gris):

- [ ] `mail` A → DNS only
- [ ] `mx1` A → DNS only
- [ ] `ftp` A → DNS only
- [ ] `mipanel` A → DNS only (verificar que exista; si no, crear: → `200.58.109.42`)
- [ ] `autoconfig` CNAME → DNS only
- [ ] `autodiscover` CNAME → DNS only

Quedan con proxy naranja solamente: `wilsonhotel.com.ar` A y `www` CNAME.

#### 1B. Contactar al webmaster (20 min)

Enviar mensaje al webmaster con estos puntos:

1. Explicar que se va a mover la gestión del correo a una cuenta propia de DonWeb
2. Pedir que haga el **desparkeo** del dominio `wilsonhotel.com.ar` desde su panel de Revendedor
3. Coordinar día y horario exacto — proponer **miércoles 30 de julio, 22:00 hs**
4. Preguntar si prefiere hacer una **transferencia** del dominio dentro de DonWeb en vez de desparkeo — si se puede transferir el servicio de correo a la cuenta de Agustín, las casillas sobreviven y no hay que reimportar

---

### Fase 2 — Cambiar NS en NIC.ar

**Cuándo:** Lunes 28 de julio (o martes 29 si no se consigue acceso el lunes)  
**Horario:** 9:00-10:00 hs — maximizar tiempo de propagación antes del miércoles  
**Duración:** 15 minutos  
**Quién:** Agustín + dueño del hotel (clave fiscal para NIC.ar)

Pasos:

1. [ ] Ingresar al panel de NIC.ar con clave fiscal del dueño
2. [ ] Ir a la configuración de DNS de `wilsonhotel.com.ar`
3. [ ] Cambiar nameservers de `ns9/ns10.hostmar.com` → los NS asignados por Cloudflare
4. [ ] Guardar cambios

**⚠️ CRÍTICO: NO hacer ningún desparkeo/transferencia antes de que la Fase 3 esté completa. Si el webmaster desparkea antes de que Cloudflare sea autoritativo, se cae todo.**

---

### Fase 3 — Verificar propagación

**Cuándo:** Martes 29 a jueves 31 de julio (chequear 2-3 veces por día)  
**Horario:** 10:00, 16:00, 22:00  
**Duración:** 2 minutos por chequeo  
**Quién:** Agustín

```bash
dig NS wilsonhotel.com.ar
```

**Criterio de éxito:** devuelve los nameservers de Cloudflare (no `ns9/ns10.hostmar.com`).

Verificación adicional:

```bash
dig MX wilsonhotel.com.ar
dig A mail.wilsonhotel.com.ar
```

Si para el martes 29 a la noche ya propagó, se puede adelantar la Fase 4 al miércoles 30.  
Si para el jueves 31 no propagó, esperar — no apurar el desparkeo.

---

### Fase 4 — Backup final + desparkeo coordinado con webmaster

**Cuándo:** Miércoles 30 de julio (o jueves 31 si la propagación tardó)  
**Horario:** 21:30-22:30 hs — fuera del horario laboral del hotel  
**Duración:** ~1 hora  
**Quién:** Agustín + webmaster (cada uno en su panel de DonWeb)

**Prerequisito obligatorio:** `dig NS wilsonhotel.com.ar` devuelve NS de Cloudflare.

#### 21:30 — Backup final pre-corte

Ejecutar backup incremental + validación para capturar emails que hayan entrado desde el último backup:

```bash
python3 backup_mail.py
python3 validate_backup.py
```

Esperar resultado `✓ BACKUP COMPLETO` antes de continuar.

#### 22:00 — Secuencia de corte minuto a minuto

| Hora | Acción | Quién |
|---|---|---|
| 22:00 | Confirmar por WhatsApp/llamada que ambos están listos | Ambos |
| 22:02 | Webmaster desparkea/transfiere el dominio desde su panel de Revendedor | Webmaster |
| 22:05 | Webmaster confirma que completó el desparkeo | Webmaster |
| 22:06 | Agustín entra a su cuenta DonWeb → asociar `wilsonhotel.com.ar` al Plan 10 | Agustín |
| 22:10 | Ir a "Mis servicios → Gestionar → Datos de configuración" del Plan 10 | Agustín |
| 22:12 | Copiar: IP nueva del mail server, datos IMAP/SMTP | Agustín |
| 22:15 | Abrir ticket/chat pidiendo valores de DKIM (si no aparecen en el panel) | Agustín |
| 22:15 | Actualizar registros de correo en Cloudflare (ver detalle abajo) | Agustín |
| 22:25 | Email de prueba entrante: Gmail personal → info@wilsonhotel.com.ar | Agustín |
| 22:30 | Email de prueba saliente: info@wilsonhotel.com.ar → Gmail personal | Agustín |
| 22:35 | Si pasan: éxito. Si no: revisar registros en Cloudflare | Agustín |

#### Registros a actualizar en Cloudflare (22:15)

| Registro | Acción | Valor nuevo |
|---|---|---|
| `mail` A | Cambiar IP | → IP nueva del Plan 10 |
| MX prioridad 0 | Verificar | Debe apuntar a `mail.wilsonhotel.com.ar` |
| MX prioridad 20 (`mx1`) | Evaluar | Eliminar si DonWeb no da MX backup |
| `mx1` A | Evaluar | Eliminar si se eliminó el MX 20 |
| SPF TXT | Actualizar si cambió | Probablemente sigue `v=spf1 include:spf.hostmar.com -all` |
| DKIM TXT (`mail._domainkey`) | Actualizar | Valor nuevo del Plan 10 |
| DMARC TXT | Subir de nivel | Cambiar de `p=none` a `p=quarantine` |
| `autoconfig` / `autodiscover` | Actualizar si cambió | Según lo que indique DonWeb |

#### Downtime estimado

- **Correo entrante:** ~10 minutos (entre 22:02 y 22:15). Con TTL 300s, propagación rápida.
- **Correo saliente:** sin corte — los clientes usan SMTP directo.
- **Mails enviados durante el hueco:** MTAs reintentan 24-72h. Con ~1 mail/hora, improbable perder algo.

---

### Fase 5 — Crear casillas + importar backup

**Cuándo:** Jueves 31 de julio  
**Horario:** 9:00-12:00 hs  
**Duración:** 2-3 horas  
**Quién:** Agustín

#### 5A. Crear las 9 casillas en el Plan 10

| # | Cuenta | Volumen original | Contraseña |
|---|---|---|---|
| 1 | dastorga@wilsonhotel.com.ar | 846 MB | Nueva, segura |
| 2 | administracion@wilsonhotel.com.ar | 26 MB | Nueva, segura |
| 3 | fdagum@wilsonhotel.com.ar | 14 MB | Nueva, segura |
| 4 | info@wilsonhotel.com.ar | 1 MB | Nueva, segura |
| 5 | reservas@wilsonhotel.com.ar | 1 MB | Nueva, segura |
| 6 | recepcion@wilsonhotel.com.ar | 1 MB | Nueva, segura |
| 7 | faresdagum@wilsonhotel.com.ar | 1 MB | Nueva, segura |
| 8 | web@wilsonhotel.com.ar | 1 MB | Nueva, segura |
| 9 | no-reply@wilsonhotel.com.ar | 1 MB | Nueva, segura |

Guardar todas las contraseñas en un gestor de contraseñas.

**Nota:** si el webmaster hizo **transferencia** (no desparkeo) y las casillas sobrevivieron, omitir creación e importación — solo verificar acceso.

#### 5B. Importar backup vía IMAP

Para cada cuenta, ejecutar `imapsync` desde el backup local al nuevo servidor:

```bash
imapsync \
  --host1 localhost --port1 993 --ssl1 \
  --user1 cuenta@wilsonhotel.com.ar --password1 "[pass_backup]" \
  --host2 [IP_NUEVA_PLAN10] --port2 993 --ssl2 \
  --user2 cuenta@wilsonhotel.com.ar --password2 "[pass_nueva]"
```

Empezar por `dastorga@` (846 MB). Las demás son livianas.

**Alternativa:** si `imapsync` no puede leer del backup local, importar con Thunderbird: agregar cuenta nueva → arrastrar emails desde carpeta local → se suben por IMAP al nuevo servidor.

#### 5C. Verificar integridad post-importación

Para cada cuenta:
- [ ] Cantidad de mensajes coincide con el backup
- [ ] Carpetas completas (Inbox, Enviados, Borradores, personalizadas)
- [ ] Adjuntos se abren correctamente
- [ ] Fechas originales preservadas

---

### Fase 6 — Configurar email en dispositivos del personal del hotel

**Cuándo:** Viernes 1 de agosto (o sábado 2 si hace falta)  
**Horario:** 10:00-14:00 hs — coordinar con gerente para disponibilidad del personal  
**Duración:** ~20 minutos por persona  
**Quién:** Agustín (presencial en el hotel o remoto por videollamada)

#### Datos de configuración (completar con valores reales del Plan 10)

| Campo | Valor |
|---|---|
| **Servidor entrante (IMAP)** | mail.wilsonhotel.com.ar (o el que indique DonWeb) |
| **Puerto IMAP** | 993 |
| **Seguridad IMAP** | SSL/TLS |
| **Servidor saliente (SMTP)** | mail.wilsonhotel.com.ar (o el que indique DonWeb) |
| **Puerto SMTP** | 465 (SSL) o 587 (STARTTLS) |
| **Seguridad SMTP** | SSL/TLS o STARTTLS |
| **Usuario** | dirección completa (ej. reservas@wilsonhotel.com.ar) |
| **Contraseña** | la nueva asignada en Fase 5A |
| **Webmail** | URL que provea DonWeb (si hay) |

#### Dispositivos a configurar por cuenta

| Cuenta | Dispositivo probable | App | Prioridad |
|---|---|---|---|
| dastorga@ | PC escritorio + celular | Outlook + Mail iOS/Android | Alta |
| administracion@ | PC escritorio | Outlook | Alta |
| reservas@ | PC recepción + celular | Outlook + Mail iOS/Android | Alta |
| recepcion@ | PC recepción | Outlook | Alta |
| info@ | PC recepción (compartida) | Outlook o webmail | Media |
| fdagum@ | PC escritorio + celular | Outlook + Mail iOS/Android | Media |
| faresdagum@ | Verificar si sigue activa | — | Baja |
| web@ | No requiere config — solo recibe | Redirigir a info@ | Baja |
| no-reply@ | No requiere config — solo envía | Config en sistema (Winpax) si aplica | Baja |

#### Instrucciones por plataforma

**Outlook (Windows/Mac):**
1. Archivo → Agregar cuenta
2. Ingresar email completo → Configuración avanzada → IMAP
3. Servidor entrante: mail.wilsonhotel.com.ar, puerto 993, SSL
4. Servidor saliente: mail.wilsonhotel.com.ar, puerto 465, SSL
5. Ingresar contraseña nueva
6. Verificar que se sincronicen los emails históricos

**iPhone (Mail nativa):**
1. Ajustes → Mail → Cuentas → Agregar cuenta → Otra
2. Agregar cuenta de correo
3. Nombre, email, contraseña nueva, descripción
4. Servidor entrante: mail.wilsonhotel.com.ar, puerto 993, SSL
5. Servidor saliente: mail.wilsonhotel.com.ar, puerto 465, SSL
6. Guardar

**Android (Gmail app):**
1. Gmail → Agregar cuenta → Otra
2. Ingresar email → Manual → IMAP
3. Servidor entrante: mail.wilsonhotel.com.ar, puerto 993, SSL/TLS
4. Servidor saliente: mail.wilsonhotel.com.ar, puerto 465, SSL/TLS
5. Contraseña nueva
6. Guardar

#### Checklist por persona

- [ ] Eliminar cuenta vieja del dispositivo (o desactivarla)
- [ ] Agregar cuenta nueva con datos del Plan 10
- [ ] Enviar email de prueba saliente
- [ ] Recibir email de prueba entrante
- [ ] Verificar que emails históricos aparezcan
- [ ] Anotar problemas o configuraciones especiales

---

### Fase 7 — Monitoreo post-migración

**Cuándo:** Sábado 2 a miércoles 6 de agosto  
**Horario:** chequeo diario a las 10:00 y 18:00  
**Duración:** 5 minutos por chequeo  
**Quién:** Agustín

| Día | Chequeo |
|---|---|
| Sáb 2 agosto | ¿Llegan emails entrantes? ¿Salen sin ir a spam? Preguntar al personal si detecta algo raro |
| Dom 3 agosto | Repetir chequeo. Revisar cola de salida si el panel lo permite |
| Lun 4 agosto | Primer día laborable completo post-migración. Estar disponible por si hay problemas |
| Mar 5 agosto | Verificar DKIM con mail-tester.com (enviar email a la dirección que dan) |
| Mié 6 agosto | Si todo OK → DMARC de `p=quarantine` a `p=reject` → **migración completa** |

---

## Plan B — Si el webmaster no coopera

Si no es posible coordinar con el webmaster para el desparkeo:

1. Enviar a DonWeb (respondiendo ticket 893657) la documentación:
   - Foto del estatuto de AGA TURISMO S.A.
   - DNI a color de un miembro del estatuto
   - Captura de pantalla del TAD (mostrando acceso a la entidad y al dominio)
2. DonWeb gestiona el desparkeo (días según su SLA)
3. La Fase 4 se ejecuta cuando DonWeb confirme la desvinculación
4. El resto del plan sigue igual

---

## Resumen visual del timeline

```
Vie 25 jul          Corregir Cloudflare proxy + contactar webmaster
                    ───────────────────────────────────────────────
Sáb 26 - Dom 27    (espera)
                    ───────────────────────────────────────────────
Lun 28 jul  09:00   Cambiar NS en NIC.ar → Cloudflare
                    ───────────────────────────────────────────────
Mar 29 jul          Verificar propagación (dig NS) 10:00/16:00/22:00
                    ───────────────────────────────────────────────
Mié 30 jul  21:30   Backup final pre-corte (backup_mail.py + validate)
            22:00   DESPARKEO coordinado con webmaster
            22:35   Correo operativo en Plan 10
                    ───────────────────────────────────────────────
Jue 31 jul  09:00   Crear casillas + importar backup (3 hs)
                    ───────────────────────────────────────────────
Vie 1 ago   10:00   Configurar email en dispositivos del personal (4 hs)
                    ───────────────────────────────────────────────
Sáb 2 ago           Monitoreo
 a mié 6 ago        Chequeos diarios 10:00 y 18:00
            mié 6   DMARC p=reject → MIGRACIÓN COMPLETA
```

## Archivos relacionados

- `migracion-email-wilson-hotel.md` — plan general, backup, infraestructura, cuentas
- `dnsrecords.txt` — registros DNS actuales (snapshot 2026-07-23)
- `cloudflare-import.txt` — archivo de importación para Cloudflare
- `backup_mail.py` — script de backup incremental IMAP
- `validate_backup.py` — script de validación de integridad del backup
