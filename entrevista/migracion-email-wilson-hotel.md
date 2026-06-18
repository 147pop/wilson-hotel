# Plan de Migración de Servidor de Email — Wilson Hotel

## Contexto
Wilson Hotel usa email corporativo alojado en un VPS compartido con la web, gestionado por un webmaster externo. El gerente prioriza seguridad y estabilidad, pero el webmaster actual no está haciendo mejoras. Se necesita migrar la gestión del email a una cuenta propia (Agustín), evaluando alternativas viables en precio y usabilidad, con migración completa de datos históricos.

**ALERTA: El dominio wilsonhotel.com.ar expira el 15 de julio de 2026 (menos de 1 mes). Renovar es prerequisito absoluto.**

---

## Fingerprinting del Servidor Actual

### Infraestructura Identificada
| Componente | Detalle |
|---|---|
| **Proveedor** | DonWeb (panel Ferozo), DNS via Hostmar (ns9/ns10.hostmar.com) |
| **Servidor físico** | VPS DattaWeb: `vps-2193076-x.dattaweb.com` |
| **IP** | 179.43.121.191 (web + mail en mismo servidor) |
| **Panel de control** | Ferozo (propietario de DonWeb) |
| **Servidor web** | Apache + PHP 7.4.33 + WordPress |
| **Servidor de mail** | Courier-IMAP (versión 1998-2011) |
| **MX primario** | mail.wilsonhotel.com.ar → 179.43.121.191 |
| **MX secundario** | mx1.wilsonhotel.com.ar → 200.58.122.206 (backup Hostmar/DonWeb) |
| **Dominio** | wilsonhotel.com.ar — registrado por AGA TURISMO S.A. (CUIT 30708153911) |
| **Registrar** | NIC Argentina |
| **Expiración dominio** | **2026-07-15** (URGENTE — renovar ya) |

### Protocolos de Mail Activos
| Protocolo | Puerto | SSL/TLS | Certificado |
|---|---|---|---|
| IMAP | 993 | SSL ✓ | Avast trusted CA (expira 2026-08-27) |
| POP3 | 995 | SSL ✓ | DattaWeb cert |
| POP3 | 110 | Sin cifrar ⚠️ | — |
| SMTP | 465 | SSL ✓ | Let's Encrypt |
| SMTP | 587 | STARTTLS ✓ | Let's Encrypt |

### Autenticación de Email (DNS)
| Record | Estado | Detalle |
|---|---|---|
| **SPF** | ✅ Configurado | `v=spf1 include:spf.hostmar.com -all` |
| **DKIM** | ❌ No configurado | Sin registro `default._domainkey` |
| **DMARC** | ⚠️ Solo monitoreo | `v=DMARC1; p=none` (no bloquea spoofing) |

### Cuentas de Email Conocidas (de entrevista)
- info@wilsonhotel.com.ar (consultas generales, formulario web)
- reservas@wilsonhotel.com.ar (agencias y reservas directas)
- administracion@wilsonhotel.com.ar (proveedores)
- recepcion@wilsonhotel.com.ar
- gerencia@wilsonhotel.com.ar

### Problemas de Seguridad Detectados
1. **Courier-IMAP desactualizado** — versión de 2011, sin parches de seguridad modernos
2. **No hay DKIM** — emails del hotel más propensos a caer en spam
3. **DMARC p=none** — cualquiera puede enviar emails haciéndose pasar por @wilsonhotel.com.ar
4. **POP3 puerto 110 abierto sin cifrar** — credenciales pueden interceptarse en tránsito
5. **Web + Mail en mismo VPS** — si la web (WordPress/PHP 7.4 EOL) se compromete, el mail también
6. **PHP 7.4.33 EOL** — fin de vida desde noviembre 2022, vulnerabilidades conocidas sin parchar
7. **Certificados SSL inconsistentes** — IMAP usa Avast CA, SMTP usa Let's Encrypt (configuración descuidada)
8. **Webmail no funcional** — mail.wilsonhotel.com.ar muestra página default "Alta en proceso" de Ferozo

---

## Alternativas de Migración

### Opción A — DonWeb: Nueva Cuenta Gestionada por Vos

**Escenario:** Crear cuenta propia en DonWeb, contratar plan de hosting que incluya email, migrar todo del webmaster actual a tu control.

#### A1. DonWeb Web Hosting Emprendedor (web + email juntos)
| | Detalle |
|---|---|
| **Precio** | ARS $3,000/mes (pago anual) · ARS $13,500/mes (pago mensual) |
| **Storage** | 100 GB NVMe |
| **Cuentas email** | Ilimitadas |
| **Panel** | Ferozo (mismo panel que tienen ahora) |
| **SSL** | Let's Encrypt gratis |
| **Backup** | Semanal |
| **Dominio gratis** | 1 año (.STORE/.ONLINE/.SITE) — no aplica a .com.ar |
| **Ventaja** | Más barato, todo en uno, panel familiar, soporte 24/7 en español |
| **Desventaja** | Web + mail siguen acoplados en mismo servidor, Courier-IMAP (mismo software viejo de mail) |

#### A2. DonWeb Email Profesional Plan 5 (solo email, separado de web)
| | Detalle |
|---|---|
| **Precio** | ARS $2,100/mes (pago anual) |
| **Cuentas** | 5 cuentas de email |
| **Storage** | 25 GB NVMe total |
| **Features** | Anti-spam con IA, webmail profesional, POP3/IMAP/SMTP, calendario, contactos |
| **Ventaja** | Email separado de web = más seguro, precio muy bajo |
| **Desventaja** | Solo 5 cuentas (si necesitan más → Plan 10 a ARS $2,700/mes con 10 cuentas y 50GB) |

#### A3. DonWeb Cloud Server (VPS propio, control total)
| | Detalle |
|---|---|
| **Precio** | Desde ARS $3,707/mes (config mínima: 1 vCPU, 1GB RAM, 10GB) |
| **Config recomendada** | 2 vCPU, 4GB RAM, 40GB (para Ferozo) — precio mayor, consultar configurador |
| **Panel** | Ferozo, cPanel, CloudPanel o CyberPanel a elección |
| **Acceso** | Root completo, firewall virtual, consola web |
| **Incluye** | Anti-DDoS, backups, 1TB transfer, IPv4+IPv6 dedicada |
| **Ventaja** | Control total, podés instalar lo que quieras, separar servicios |
| **Desventaja** | Requiere administración de servidor (vos lo gestionás), más caro |

#### Migración DonWeb → DonWeb (cómo funciona)
1. **Crear cuenta nueva** en DonWeb a tu nombre (tu email, tu tarjeta)
2. **Contratar plan** (A1, A2 o A3)
3. **Si ambos servicios usan Ferozo:** soporte DonWeb puede migrar emails internamente (abrir ticket)
4. **Si planes incompatibles:** backup via IMAP/POP3 + recrear cuentas en nuevo plan
5. **Cambiar NS en NIC Argentina:** apuntar wilsonhotel.com.ar a los NS del nuevo servicio (siguen siendo ns9/ns10.hostmar.com si es Ferozo)
6. **Dominio .com.ar:** se gestiona en NIC Argentina (nic.ar), no se "transfiere" — se cambian los NS o se hace cambio de titular si corresponde
7. **Dar de baja** servicio viejo del webmaster una vez confirmada la migración

---

### Opción B — Google Workspace (Recomendada para email profesional)
| | Detalle |
|---|---|
| **Plan** | Business Starter |
| **Precio** | USD $7/usuario/mes (pago anual) = ~USD $35/mes para 5 cuentas |
| **Storage** | 30 GB por usuario (pooled) |
| **Incluye** | Gmail, Google Drive, Meet, Calendar, Docs |
| **Seguridad** | 2FA, protección anti-phishing, anti-spam líder del mercado, cifrado TLS en tránsito |
| **Uptime SLA** | 99.9% |
| **DKIM/DMARC** | Configuración guiada desde Admin Console |
| **Migración** | Herramienta nativa de migración IMAP en Admin Console |
| **Ventaja clave** | Mejor deliverability del mercado, interfaz familiar (Gmail), cero mantenimiento de servidor |
| **Soporte** | 24/7 en español |

### Opción C — Microsoft 365 Business Basic
| | Detalle |
|---|---|
| **Plan** | Business Basic |
| **Precio** | USD $7/usuario/mes desde julio 2026 = ~USD $35/mes para 5 cuentas |
| **Storage** | 50 GB por usuario (sube a 100 GB desde agosto 2026) |
| **Incluye** | Outlook, OneDrive (1TB), Teams, SharePoint |
| **Seguridad** | Exchange Online Protection, 2FA, cifrado TLS |
| **DKIM/DMARC** | Configuración desde Exchange Admin Center |
| **Migración** | IMAP migration tool nativo |
| **Ventaja clave** | Más storage por usuario, suite Office completa en web |
| **Desventaja** | Interfaz más compleja para usuarios no técnicos |

### Opción D — Zoho Mail
| | Detalle |
|---|---|
| **Plan** | Mail Lite |
| **Precio** | USD $1/usuario/mes = ~USD $5/mes para 5 cuentas |
| **Storage** | 5 GB por usuario |
| **Incluye** | Webmail, IMAP, POP, ActiveSync, apps móviles |
| **Seguridad** | 2FA, cifrado TLS, anti-spam |
| **DKIM/DMARC** | Soportado |
| **Migración** | Herramienta de importación IMAP |
| **Ventaja clave** | Precio muy bajo |
| **Desventaja** | Menor ecosistema, soporte en inglés, interfaz menos intuitiva, 5GB limitado |

---

### Comparativa Rápida (5 usuarios)

| Criterio | DonWeb Emprendedor | DonWeb Email Pro | DonWeb Cloud | Google Workspace | Microsoft 365 | Zoho Mail |
|---|---|---|---|---|---|---|
| Costo mensual | ~ARS $3,000 | ~ARS $2,100 | desde ARS $3,707 | ~USD $35 | ~USD $35 | ~USD $5 |
| En pesos (aprox) | ARS $3,000 | ARS $2,100 | ARS $3,707+ | ARS ~$50,000 | ARS ~$50,000 | ARS ~$7,000 |
| Cuentas email | Ilimitadas | 5 | Ilimitadas | 5 | 5 | 5 |
| Storage/email | Compartido 100GB | 25GB total | Según config | 30GB/usuario | 50-100GB/usuario | 5GB/usuario |
| Anti-spam | Básico | IA | Depende config | ★★★★★ | ★★★★ | ★★★ |
| Deliverability | ★★★ | ★★★ | ★★★ | ★★★★★ | ★★★★ | ★★★ |
| Control servidor | No | No | Sí (root) | No | No | No |
| Mantenimiento | DonWeb | DonWeb | Vos | Google | Microsoft | Zoho |
| Soporte español | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★ |
| Migración IMAP | Ticket soporte | Ticket soporte | Manual | Nativa | Nativa | Nativa |
| Pago en pesos | ✅ | ✅ | ✅ | ❌ (USD) | ❌ (USD) | ❌ (USD) |

### Recomendación por Escenario

**Si prioridad = precio bajo + control + pago en pesos:**
→ **DonWeb Email Profesional Plan 5 (A2)** para email + plan hosting aparte para web. Email separado de web = más seguro. ARS $2,100/mes email + ARS $3,000/mes hosting = ARS $5,100/mes total.

**Si prioridad = máxima seguridad + deliverability + cero mantenimiento:**
→ **Google Workspace (B)** para email + DonWeb hosting para web. Mejor anti-spam, mejor deliverability, DKIM/DMARC guiado. USD $35/mes email + ARS $3,000/mes hosting.

**Si prioridad = control total + todo en un lugar:**
→ **DonWeb Cloud Server (A3)** con Ferozo o CloudPanel. Hosteas web + mail vos mismo. Más trabajo de admin pero máxima flexibilidad. Desde ARS $3,707/mes todo.

---

## Planes de Migración Paso a Paso

### Fase 0 — Urgente: Renovar Dominio (ANTES del 15/07/2026)
1. Verificar que AGA TURISMO S.A. renueve wilsonhotel.com.ar en NIC Argentina (nic.ar)
2. Si no se renueva, el dominio se pierde y TODO deja de funcionar
3. Idealmente: que el gerente te dé acceso a la cuenta NIC Argentina para gestionar DNS vos mismo

---

### Ruta 1: Migración DonWeb → DonWeb (nueva cuenta tuya)

#### Fase 1 — Crear Nueva Cuenta (Día 1)
1. Registrarte en donweb.com con tu email/datos
2. Contratar plan elegido (Email Pro Plan 5/10 o Hosting Emprendedor o Cloud Server)
3. Agregar dominio wilsonhotel.com.ar al nuevo servicio (sin cambiar DNS aún)
4. Crear las 5 cuentas de email en el nuevo panel Ferozo

#### Fase 2 — Migración de Emails Históricos (Día 2-3)
**Opción A: Migración interna DonWeb (si ambos servicios son Ferozo)**
1. Abrir ticket de soporte en DonWeb: "Necesito migrar cuentas de email del servicio [viejo ID] al servicio [nuevo ID]"
2. DonWeb puede migrar internamente emails, aliases y reenvíos
3. Verificar que emails históricos aparecen en nuevo servicio

**Opción B: Migración manual via IMAP (si soporte no puede o planes incompatibles)**
1. En cada cuenta del nuevo servicio, configurar "Fetch from external account" si Ferozo lo soporta
2. Alternativa: usar herramienta como `imapsync` desde terminal:
   ```bash
   imapsync \
     --host1 mail.wilsonhotel.com.ar --port1 993 --ssl1 \
     --user1 info@wilsonhotel.com.ar --password1 "[pass_vieja]" \
     --host2 [nuevo_servidor] --port2 993 --ssl2 \
     --user2 info@wilsonhotel.com.ar --password2 "[pass_nueva]"
   ```
3. Repetir para cada cuenta (5 cuentas)
4. Verificar carpetas, adjuntos, fechas

**Opción C: Backup local con cliente de correo**
1. Configurar Thunderbird con IMAP del servidor viejo
2. Descargar todos los emails localmente
3. Reconfigurar Thunderbird con IMAP del servidor nuevo
4. Subir emails al nuevo servidor

#### Fase 3 — Configurar DNS y Seguridad (Día 3-4)
1. En NIC Argentina (nic.ar): cambiar NS del dominio a los del nuevo servicio DonWeb
   - Si nuevo servicio usa Ferozo: ns9.hostmar.com + ns10.hostmar.com (mismos NS, solo cambiar zona DNS)
   - Si Cloud Server con otro panel: NS que DonWeb asigne
2. Configurar registros MX apuntando al nuevo servidor
3. **SPF**: `v=spf1 include:spf.hostmar.com -all` (si sigue en DonWeb)
4. **DKIM**: Configurar desde panel Ferozo (si disponible) o manualmente en Cloud Server
5. **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:gerencia@wilsonhotel.com.ar`
6. Cerrar puerto POP3 110 (sin cifrar) — forzar solo conexiones SSL

#### Fase 4 — Cutover (Día 4-5)
1. Propagación DNS: 24-48 horas
2. Mantener servicio viejo activo 1 semana para emails rezagados
3. Re-sincronizar con imapsync después de 48hs para capturar últimos emails
4. Verificar flujo completo: enviar/recibir desde cada cuenta

#### Fase 5 — Dar de Baja Servicio Viejo (Día 10+)
1. Confirmar que todo funciona en nuevo servicio
2. Pedir al webmaster que cancele el servicio viejo (o dejar que expire)
3. Guardar backup final por las dudas

---

### Ruta 2: Migración DonWeb → Google Workspace

#### Fase 1 — Preparación (Día 1-2)
1. Crear cuenta Google Workspace con dominio wilsonhotel.com.ar
2. Verificar propiedad del dominio (registro TXT en DNS actual)
3. Crear las 5 cuentas de usuario en Google Admin Console
4. **NO cambiar registros MX todavía** — mail sigue entrando al servidor viejo

#### Fase 2 — Migración de Datos Históricos (Día 2-3)
1. En Google Admin Console → Data > Data Import
2. Preparar CSV con columnas:
   ```
   Source ImapUser, Source ImapPassword, Target GUser
   info@wilsonhotel.com.ar, [pass], info@wilsonhotel.com.ar
   reservas@wilsonhotel.com.ar, [pass], reservas@wilsonhotel.com.ar
   administracion@wilsonhotel.com.ar, [pass], administracion@wilsonhotel.com.ar
   recepcion@wilsonhotel.com.ar, [pass], recepcion@wilsonhotel.com.ar
   gerencia@wilsonhotel.com.ar, [pass], gerencia@wilsonhotel.com.ar
   ```
3. Configurar servidor IMAP origen: `mail.wilsonhotel.com.ar`, puerto 993, SSL
4. Ejecutar migración — importa todos los emails históricos a Gmail
5. Verificar carpetas, adjuntos, fechas

#### Fase 3 — Configurar Seguridad (Día 3)
1. **DKIM**: Google Admin → Apps → Gmail → Authenticate email → agregar TXT en DNS
2. **SPF**: Cambiar a `v=spf1 include:_spf.google.com ~all`
3. **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:gerencia@wilsonhotel.com.ar`
4. Configurar 2FA para todas las cuentas

#### Fase 4 — Cutover: Cambiar MX (Día 4)
1. Cambiar registros MX en DNS:
   ```
   Borrar:
     0  mail.wilsonhotel.com.ar
     20 mx1.wilsonhotel.com.ar
   
   Agregar:
     1  ASPMX.L.GOOGLE.COM
     5  ALT1.ASPMX.L.GOOGLE.COM
     5  ALT2.ASPMX.L.GOOGLE.COM
     10 ALT3.ASPMX.L.GOOGLE.COM
     10 ALT4.ASPMX.L.GOOGLE.COM
   ```
2. Propagación DNS: 24-48 horas
3. Mantener servidor viejo activo 1 semana
4. Re-ejecutar migración IMAP después de 48hs para capturar rezagados

#### Fase 5 — Configuración de Clientes (Día 4-5)
1. App Gmail en celulares del personal
2. Si usan Outlook/Thunderbird: reconfigurar con imap.gmail.com:993
3. Capacitación mínima (Gmail es familiar para todos)

#### Fase 6 — Validación y Cierre (Día 5-7)
1. Enviar/recibir email de prueba desde cada cuenta
2. Verificar DKIM con mail-tester.com
3. Verificar SPF: `dig TXT wilsonhotel.com.ar`
4. Confirmar emails históricos accesibles
5. Dar de baja servicio viejo después de 1 semana sin problemas

---

## Información Necesaria del Cliente para Ejecutar
- [ ] Contraseñas actuales de las 5+ cuentas de email (para migración IMAP)
- [ ] **URGENTE:** Confirmación de que el dominio fue renovado (expira 2026-07-15)
- [ ] Acceso al panel Ferozo actual o contacto del webmaster para obtenerlo
- [ ] Acceso a cuenta NIC Argentina (nic.ar) para gestionar DNS del dominio
- [ ] Lista completa de cuentas email (pueden haber más que las 5 mencionadas en la entrevista)
- [ ] Decisión de ruta: DonWeb nueva cuenta (A1/A2/A3) o Google Workspace (B)
- [ ] Si Google Workspace: aprobación presupuesto USD $35/mes
- [ ] Definir quién será admin del nuevo servicio

---

## Riesgos y Mitigación
| Riesgo | Mitigación |
|---|---|
| Dominio expira 2026-07-15 (< 1 mes) | Renovar YA en nic.ar — prerequisito absoluto |
| Pérdida de emails durante cutover | Mantener servidor viejo activo 1 semana + re-sincronizar |
| Webmaster no entrega accesos | Gerente tiene relación directa. Peor caso: crear todo nuevo y migrar por IMAP |
| DonWeb soporte lento para migración interna | Tener plan B listo (imapsync manual) |
| Emails históricos muy pesados | imapsync maneja volúmenes grandes; Google importa sin límite razonable |
| Personal no se adapta (si se va a Google) | Capacitación + Gmail es familiar para la mayoría |
| Cloud Server requiere mantenimiento | Solo elegir A3 si vos vas a administrar el servidor activamente |

---

## Promo Actual DonWeb
Código **AGUANTE-ARGENTINA**: 10% de descuento + 1% extra por cada gol de Argentina en el Mundial 2026. Aplicable a productos seleccionados.

---

*Documento generado: Junio 2026 — Precios sujetos a cambios*
