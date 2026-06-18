# Lógica completa del sistema de reservas — Wilson Hotel (Winpax Motor)

## Arquitectura general

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (Motor)                       │
│          motor.winpax.com.ar/search.php?hotel_id=133     │
│                                                          │
│  search.php ──→ checkout.php ──→ confirm.php             │
│     │                │               │                    │
│     │           modify/?hotel_id=133 (cancelar/modificar)│
└─────┼────────────────┼───────────────┼───────────────────┘
      │                │               │
      ▼                ▼               ▼
┌──────────────────────────────────────────────────────────┐
│                    BACKEND (PHP + AJAX)                   │
│                                                          │
│  d/calc_amount_booking.php    → Calcula precios          │
│  d/checkout.php               → Carga resumen reserva    │
│  d/checkout_go.php            → Procesa la reserva       │
│  d/get_room_details.php       → Detalle habitación       │
│  d/get_guest_details.php      → Autocomplete huésped     │
│  d/reload_session_booking.php → Restaura sesión          │
│  d/session.php                → Guarda preferencias       │
│  d/changes.php                → Cambia idioma/moneda     │
│  d/payments.php               → Modal métodos de pago    │
│  d/check_active_methods.php   → Valida métodos activos   │
│  d/get_calendar.php           → Disponibilidad calendario│
│  d/get_alternative_results.php→ Fechas alternativas      │
│  d/getFormAges.php            → Formulario edades niños  │
│  d/getServicesDatesHours.php  → Fechas/horas servicios   │
│  validate_bin.php             → Valida BIN tarjeta       │
│                                                          │
│  Assets en S3: winpax-files.s3.amazonaws.com/            │
│    projects-storage/motor/uploads/133/                    │
└──────────────────────────────────────────────────────────┘
      │
      ▼
┌──────────────────────────────────────────────────────────┐
│              PMS Winpax (108.181.188.80)                  │
│              Channel Manager: Channex                     │
│              Encriptación de tarjetas: Sí                 │
└──────────────────────────────────────────────────────────┘
```

---

## Flujo completo de reserva (paso a paso)

### PASO 1: Búsqueda (search.php)

**Input del usuario:**
- Fecha desde / hasta (daterangepicker, formato DD-MM-YYYY)
- Adultos y menores (ocultos por defecto, se expanden)
- Código promocional (opcional, campo toggle)
- Idioma: ES | EN | PT
- Moneda: ARS (default) | USD | EUR

**Lógica al cargar la página:**
1. Se parsea el objeto `hotel` (JSON embebido con toda la config)
2. Se llama `reloadSessionBooking()` → `d/reload_session_booking.php` (restaura reserva en progreso si existe)
3. Se renderean todas las habitaciones con sus tarifas pre-calculadas por el server

**Al hacer submit del form:**
- Se reenvía el formulario con `hotel_id`, `date_from`, `date_to`, `lang`, `currency_code`, `search_rate` (promo code)
- La página se recarga con disponibilidad y precios actualizados

**Resultado:** Se muestran 5 tipos de habitación, cada una con 3 planes tarifarios y precio por noche.

---

### PASO 2: Selección de habitaciones

**Por cada habitación + tarifa el usuario puede:**
1. Seleccionar cantidad (0-6 habitaciones) via `<select>`
2. Al seleccionar ≥1, se expande formulario dinámico por habitación con:
   - Número de adultos (min/max según tipo)
   - Número de menores
   - Tipo de cama (Matrimonial / Twin) — si `bedding: true`
   - Edades de menores (si menores > 0, popup `d/getFormAges.php`)

**Reglas de ocupación (del objeto `hotel.room_types[code].occupancy`):**

| Tipo | Código | Min pax | Max ocupan | Max cama extra | Max no ocupan |
|------|--------|---------|------------|----------------|---------------|
| Single | SGL | 1 | 1 | 0 | 0 |
| Doble Matrimonial | MAT | 1 | 2 | 0 | 0 |
| Doble Twin | TWN | 1 | 2 | 1 | 0 |
| Suite Matrimonial | JRS | 1 | 2 | 1 | 0 |
| Triple | TPL | 1 | 3 | 0 | 0 |

**Menores:**
- Edad máxima para "menor" = 3 años (`max_age_kid: 3`)
- Menores de 0-2 años: no pagan como adulto (`pay_as_adult: false`)
- Máximo 2 menores por habitación
- Si edad ≥ 3 años → cuenta como adulto (se suma a validación de ocupación máxima)

**Cálculo de precios en tiempo real:**
- Al cambiar cualquier select → `calcAmountBooking()` → POST a `d/calc_amount_booking.php`
- Envía array `booking_rooms` + `booking_services` (servicios adicionales, actualmente vacío)
- Respuesta HTML se inyecta en `#room_price .hide`

**Estructura del array de booking que se envía:**
```javascript
booking_rooms = [{
    room_type_code: "MAT",      // código tipo habitación
    rate_plan_code: "BBARS",    // código plan tarifario
    qty_ad: "2",                // adultos
    qty_ki: "0",                // menores
    bedding: "M",               // tipo cama
    ages: []                    // edades menores
}]
```

**Day Use:** El sistema soporta tarifas day-use (sin pernocte) con atributo `data-is-day-use` pero Wilson Hotel NO las usa.

---

### PASO 3: Validación pre-pago

Antes de ir al checkout, al hacer click en "Reservar":
1. `validatePaymentMethodBeforeBooking()` → POST `d/check_active_methods.php`
2. Si OK → redirige a checkout.php
3. Si error → muestra mensaje de error

---

### PASO 4: Checkout (checkout.php)

Se carga `d/checkout.php` via AJAX → muestra resumen de la reserva.

**Formulario de datos del huésped:**

| Campo | ID/Name | Requerido | Validación |
|-------|---------|-----------|------------|
| Email | `guest_email` | Sí | Regex email |
| Nombre | (cargado dinámicamente) | Sí | No vacío |
| Apellido | (cargado dinámicamente) | Sí | No vacío |
| Teléfono | `guest_phone` | Sí | Solo números |
| Tipo documento | `guest_identity_type` | Sí | Select |
| Nro documento | `guest_identity_number` | Sí | No vacío |
| Nacionalidad | `guest_country_id` | Sí | Select |
| Dirección | `guest_address` | Sí | No vacío |
| Ciudad | `guest_city` | Sí | No vacío |
| Código postal | `guest_zip` | Sí | No vacío |
| País | (select) | Sí | No vacío |
| Comentarios | `comments` | No | Max 490 chars |

**Auto-completado:** Al salir del campo email → `d/get_guest_details.php?email=X` → si el huésped ya existe en el sistema, auto-completa los campos.

**Términos y Condiciones:**
- Checkbox obligatorio para activar botón "Confirmar reserva"
- T&C extensos embebidos en HTML (ley argentina, jurisdicción Salta)
- Puntos clave:
  - Cancelación gratuita hasta 72hs antes del arribo
  - Pasadas 72hs: penalidad = 1ra noche
  - No aplica para tarifas especiales (cada una tiene sus propias condiciones)
  - IVA 21% incluido en tarifa pactada
  - No-show: se cobra 1ra noche + se cancelan noches restantes

---

### PASO 5: Pago

**Método de pago configurado: Tipo 1 — Depósito en Garantía con Tarjeta de Crédito**

`payment_type: 1` (sólo este tipo está activo)

**Tarjetas habilitadas:**
- American Express (código interno: 2065)
- Mastercard (código interno: 2064)
- Visa (código interno: 2068)

**Validación de tarjeta (flujo):**
1. Usuario ingresa número → `$.payment.formatCardNumber()` auto-formatea
2. Al salir del campo → `validateCardType()` detecta tipo (visa/mastercard/amex)
3. Al hacer submit:
   - Se extrae BIN (primeros 6 dígitos)
   - POST a `validate_bin.php` → verifica que sea tarjeta de **crédito** (no débito)
   - Si es débito → error: "Se acepta en garantía solo tarjetas de crédito"
   - Si es crédito → continúa
4. `validatePayment()`:
   - Valida número de tarjeta (`$.payment.validateCardNumber`)
   - Valida fecha de vencimiento (`$.payment.validateCardExpiry`)
   - Valida CVV (`$.payment.validateCardCVC`) — Amex: 4 dígitos, otros: 3
5. Si pasa validación → modal `d/payments.php?act=submit&card_type=X`
   - Selección de banco emisor
   - Selección de cuotas (si aplica)
6. Se setean hidden fields: `payment_data`, `card_type`, `payment_id`, `payment_installments`, `installment_amount`

**Campos del formulario de pago:**
```
card_number    → Número de tarjeta (formateado: •••• •••• •••• ••••)
card_code      → CVV/CVC (•••)
card_owner     → Titular
card_exp       → Vencimiento (•• / ••)
```

**Seguridad:**
- Encriptación de tarjetas habilitada (`cards_security_encryption: true`)
- SSL badge mostrado
- BIN validation antes de submit
- CSRF token en meta tag (vacío actualmente)

**Otros tipos de pago soportados por el motor (pero NO activos para Wilson Hotel):**
- Tipo 2/3: Pago con tarjeta + banco (popup selección)
- Tipo 4/5: Pago directo
- Tipo 7: Método 7
- Tipo 8: Con verificación de intereses
- Tipo 9: Tipo 9 (oculta campos de dirección/documento)
- Tipo 10: Sin pago

---

### PASO 6: Confirmación

**Submit final — `submitCheckout()`:**

1. Valida todos los campos `.validate` (email, teléfono, campos vacíos)
2. Muestra overlay "Por favor espere mientras procesamos su reserva. No cierre la ventana."
3. POST `d/checkout_go.php` con `$("#checkout_form").serialize()`
4. Response se inyecta en `#checkout_load`
5. Si `auto_confirm: true` → reserva se confirma automáticamente
6. Se envía email de confirmación a:
   - Huésped (al email ingresado)
   - Hotel (info@wilsonhotel.com.ar)
   - Desde: reservas@wilsonhotel.com.ar
7. Se redirige a `confirm.php` (que si no hay sesión activa, redirige a search.php)

---

### PASO 7: Modificar / Cancelar (modify/)

**Acceso:** Link "Modificar / Cancelar una reserva" en search.php

**Formulario:**
- Código de reserva (campo texto)
- Email del huésped

**Proceso:** GET con `guest_reservation_code` + `email` → busca reserva → muestra opciones de modificación/cancelación.

---

## Planes tarifarios — Lógica de precios

### Estructura de derivación:

```
BBARS (ARS, base) ──→ NRARS (ARS, -10%, no reembolsable, derivado de BBARS)
                  ──→ LST   (ARS, -15%, "Último Minuto", derivado de BBARS)

BB (USD, base)    ──→ NR    (USD, no reembolsable, derivado de BB)
                  ──→ LM    (USD, "Last Minute", derivado de BB)
```

### Planes públicos (visibles en motor):

| Código | Nombre | Moneda | Reembolsable | Highlight | Forma de pago |
|--------|--------|--------|-------------|-----------|---------------|
| BBARS | Alojamiento y Desayuno | ARS | Sí | No | Pago en hotel + garantía TC |
| LST | Último Minuto | ARS | No | **Sí (OFERTA)** | Pago anticipado total TC |
| NRARS | Aloj. y Desayuno No Reembolsable | ARS | No | No | Pago anticipado total TC |

### Planes privados (solo channels/agencias vía Channex):

| Código | Moneda | Reembolsable | Derivado de |
|--------|--------|-------------|-------------|
| BB | USD | Sí | (base) |
| NR | USD | No | BB |
| LM | USD | No | BB |

### Conversión de monedas:

```
Base: USD = 1
EUR = 0.862 × USD
ARS = 1450 × USD
```

### Políticas de cancelación:

| ID | Política | Penalidad | Tipo |
|----|----------|-----------|------|
| 8159 | Reembolsable | 1 día antes | Tipo 84 |
| 8160 | No reembolsable | 100% | Tipo 83 |

### Condiciones de pago:

| ID | Descripción | Aplica a |
|----|-------------|----------|
| 4585 | Pago en el hotel, Garantía con TC | BBARS, BB |
| 4584 | Pago anticipado total con TC | NRARS, LST, NR, LM |

---

## Calendario y disponibilidad

```javascript
// Al navegar meses en el daterangepicker:
getCalendar(date) → GET d/get_calendar.php?date=YYYY-MM-DD
// Retorna objeto con disponibilidad por día del mes
// Se cachea por mes (calendar[YYYY-MM])

// Si no hay disponibilidad:
getAlternativeResults() → POST d/get_alternative_results.php
// "Verificando fechas cercanas disponibles por una noche..."
```

**Config del calendario:**
- `calendar.status: false` → calendario de disponibilidad NO está activo en la vista de búsqueda
- `search_availability.status: false` → no muestra % de disponibilidad
- `real_availability.status: false` → no muestra disponibilidad real (tipo "quedan 2")

---

## Servicios adicionales

`hotel.services: []` — Wilson Hotel NO tiene servicios adicionales configurados.

El motor soporta servicios extra (spa, transfers, excursiones) con:
- Configuración por servicio: adultos/menores, fechas, horas
- Tipos de dato requerido: A (ninguno), B (fecha), C (fecha+hora), D (fecha única), E (fecha+hora única), F (sin datos, precio fijo)
- Fechas disponibles via `d/getServicesDatesHours.php`

---

## Sesión y persistencia

- La sesión mantiene estado entre páginas (search → checkout → confirm)
- `reloadSessionBooking()` al cargar search.php restaura selecciones previas
- Cambios de idioma/moneda via `d/session.php?n=name&v=value`
- Expiración de pago online: 5 minutos (`online_payments.expire: 5`)

---

## Integraciones

### Channex (Channel Manager)
- Cada room_type + rate_plan tiene UUID de mapping a Channex
- Expedia comisión: 0%
- Sincroniza disponibilidad e inventario

### PMS Winpax
- Host: 108.181.188.80
- `has_winpax: true`
- Envía reservas confirmadas al PMS
- Rate plans con `winpax.send_description: false` (no envía descripción al PMS)

### Google Analytics
- UA-89361264-2 (motor)
- Trackea páginas: search, checkout, confirm
- Dimensión personalizada 1: hotel_id

---

## Stack técnico del motor

| Componente | Tecnología |
|-----------|-----------|
| Backend | PHP (server-rendered + AJAX endpoints) |
| Frontend | jQuery + jQuery UI (dialog, datepicker) |
| Daterange | jquery.daterangepicker |
| Payment | jquery.payment (format/validate cards) |
| Tooltips | Tooltipster |
| Lightbox | FancyBox |
| Dates | Moment.js |
| Storage | S3 (imágenes) |
| Analytics | Google Analytics Universal |
| Fonts | Raleway (Google Fonts) |

---

## Resumen de endpoints AJAX

| Endpoint | Método | Función |
|----------|--------|---------|
| `d/calc_amount_booking.php` | POST | Calcula precio total con habitaciones y servicios seleccionados |
| `d/checkout.php` | GET | Carga resumen de reserva en checkout |
| `d/checkout_go.php` | POST | Procesa y confirma la reserva |
| `d/get_room_details.php` | GET | Popup con detalles/fotos de habitación |
| `d/get_guest_details.php` | GET | Autocomplete datos huésped por email |
| `d/reload_session_booking.php` | POST | Restaura sesión de reserva previa |
| `d/session.php` | GET | Guarda preferencia (idioma/moneda) |
| `d/payments.php` | GET | Modal selección método de pago/banco/cuotas |
| `d/check_active_methods.php` | POST | Valida métodos de pago activos |
| `d/get_calendar.php` | GET | Disponibilidad por mes |
| `d/get_alternative_results.php` | POST | Busca fechas cercanas disponibles |
| `d/getFormAges.php` | GET | Formulario edades de menores |
| `d/getServicesDatesHours.php` | POST | Fechas/horas disponibles para servicios |
| `d/get_service_details.php` | GET | Detalles de servicio adicional |
| `d/get_menu_digital.php` | GET | Menú digital (no usado) |
| `d/portal_map.php` | GET | Mapa del hotel |
| `validate_bin.php` | POST | Valida BIN de tarjeta (crédito vs débito) |
