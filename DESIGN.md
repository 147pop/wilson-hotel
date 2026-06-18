---
name: Wilson Hotel
description: Landing page del Hotel Wilson 3★ — Hospedate en el corazón de Salta.
colors:
  azul-institucional: "#123E7A"
  azul-profundo: "#0B2C57"
  oro-calido: "#d4a970"
  arena-calida: "#D8C2A0"
  marfil: "#F5F1EA"
  grafito: "#444444"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.875rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 500
    letterSpacing: "0.25em"
    lineHeight: 1
rounded:
  none: "0px"
components:
  button-navy:
    backgroundColor: "{colors.azul-profundo}"
    textColor: "{colors.marfil}"
    padding: "14px 40px"
    rounded: "{rounded.none}"
  button-navy-hover:
    backgroundColor: "{colors.oro-calido}"
    textColor: "{colors.azul-profundo}"
  button-gold:
    backgroundColor: "{colors.oro-calido}"
    textColor: "{colors.azul-profundo}"
    padding: "14px 40px"
    rounded: "{rounded.none}"
  button-gold-hover:
    backgroundColor: "{colors.marfil}"
    textColor: "{colors.azul-profundo}"
  button-outline-gold:
    backgroundColor: "transparent"
    textColor: "{colors.oro-calido}"
    padding: "14px 40px"
    rounded: "{rounded.none}"
  button-outline-gold-hover:
    backgroundColor: "{colors.oro-calido}"
    textColor: "{colors.azul-profundo}"
---

# Design System: Wilson Hotel

## 1. Overview

**Creative North Star: "La Posada del Casco Histórico"**

Este sistema visual no compite con cadenas internacionales ni con plataformas OTA. Construye su identidad sobre lo que tiene y ellas no: más de 40 años en el mismo lugar, en el centro histórico de Salta, recibiendo huéspedes con trato directo. La paleta de azules institucionales y el oro cálido son los colores de esa permanencia — sobrios, confiables, sin artificios.

La densidad es editorial sin ser magazine: jerarquía tipográfica pronunciada con Cormorant Garamond en los títulos y Montserrat en los cuerpos. El espacio en blanco no es "minimalismo" — es cortesía. Los bordes son rectos, sin radios, como las molduras del edificio de Alvarado 950.

Rechaza explícitamente: la estética OTA (Booking/Expedia con calendarios, comparativas de precio y colores de marca de distribuidora), el minimalismo frío nórdico (fondo blanco puro, tipografía ultra-thin, sin calor visual), y la estética de cadena genérica internacional (corporativo, sin sabor local salteño).

**Key Characteristics:**
- Bordes siempre rectos (0px radius) — sin excepción
- Dos fuentes exactamente: Cormorant Garamond (títulos) + Montserrat (cuerpos y labels)
- Oro como único gesto decorativo; el azul profundo como color de autoridad
- Imágenes siempre con overlay de gradiente azul — nunca recortadas flotando sobre fondo blanco
- Componentes "firmes y acogedores" — invitan sin gritar

## 2. Colors: La Paleta del Casco Histórico

Dos azules para estructura y profundidad, un oro para calidez, dos neutros cálidos para fondos, un grafito para texto largo.

### Primary
- **Azul Institucional** (#123E7A): Color de identidad del hotel, usado en fondos de secciones de soporte (rooms en B, servicios en C), bordes activos en navbar scroll, y como segundo plano donde el azul profundo sería demasiado oscuro.
- **Azul Profundo** (#0B2C57): El color de mayor autoridad. Fondos de secciones hero, navbars filled, quote bands, footers. Es el fondo que da peso a todo el sitio.

### Secondary
- **Oro Cálido** (#d4a970): El único acento decorativo del sistema. Usado en separadores (líneas 1px), labels uppercase, íconos de estrella (★★★), bordes de botones outline, y el hover de btn-navy. Su escasez es deliberada — cuando aparece, tiene peso.

### Neutral
- **Arena Cálida** (#D8C2A0): Fondo de secciones intermedias, dividers horizontales, texto secundario en fondos claros.
- **Marfil** (#F5F1EA): Fondo base del sitio (variante A). Texto principal en fondos oscuros. El tono cálido de este color es el que diferencia al sistema del "blanco estéril" que se rechaza.
- **Gris Grafito** (#444444): Texto de cuerpo largo sobre fondos claros (descripciones de habitaciones, servicios). Nunca en fondos oscuros — en esos contextos se usa Marfil o Arena Cálida con opacity reducida.

### Named Rules
**La Regla del Oro Escaso.** El oro (#d4a970) no puede ser color de fondo de sección completa excepto en el CTA final (llamada a reserva). En todos los demás contextos es línea, label, borde o detalle. Si el oro cubre más del 15% de la pantalla en un scroll, algo está mal.

**La Regla del Contraste Mínimo.** Texto sobre fondos oscuros (azul profundo o institucional): usar siempre Marfil (#F5F1EA) a opacity ≥0.85 o Arena Cálida (#D8C2A0) a opacity ≥0.85. Nunca opacity < 0.7 en texto informativo (nombres de habitaciones, descripciones, datos de contacto).

## 3. Typography: Tradición y Claridad

**Display Font:** Cormorant Garamond (con Georgia, serif como fallback)
**Body Font:** Montserrat (con sans-serif como fallback)

**Carácter:** Cormorant Garamond aporta elegancia tipográfica argentina sin pretensión de lujo internacional — es una fuente de tradición editorial que funciona en un contexto hotelero clásico. Montserrat es su contrapeso funcional: moderno, limpio, altamente legible en tamaños pequeños para labels y cuerpos.

### Hierarchy

- **Display** (400, clamp(3rem, 7vw, 5.5rem), line-height 0.88–0.92): Título principal del hero. Aparece una sola vez por página. Siempre en Azul Profundo o Marfil. Puede usarse en italic para el nombre del hotel o tagline emocional.
- **Headline** (400, clamp(2.25rem, 4.5vw, 3.875rem), line-height 0.95): Títulos de sección (Habitaciones, Servicios, Galería, Reservá tu estadía). Un H2 por sección.
- **Title** (400, 2.25rem, line-height 1.1): Nombres de habitaciones en layout editorial (variante A). Usado en contextos donde el tamaño moderado es apropiado sin competir con el Headline de sección.
- **Body** (400, 0.8125rem/13px, line-height 1.75): Texto de descripción de habitaciones y servicios. Máximo 65ch de longitud de línea. Siempre en Grafito (#444444) sobre fondos claros; en Arena Cálida o Marfil sobre fondos oscuros.
- **Label** (500, 0.5625rem/9px, letter-spacing 0.25em, UPPERCASE): Kickers y metadata — ocupación de habitaciones, nombres de secciones cortas, indicadores de tarifa. Siempre en Oro Cálido o en el color de énfasis del contexto. Usado con moderación: no en cada sección.

### Named Rules
**La Regla del Kicker Único.** Los labels uppercase con letter-spacing amplio son voz cuando aparecen selectivamente; son gramática de IA cuando aparecen sobre cada heading. Reservar el kicker gold para 2–3 secciones de alto impacto (hero, CTA de reserva, social proof). No repetir mecánicamente en cada h2.

## 4. Elevation

Este sistema es plano por defecto. No usa box-shadow como decoración estructural. La profundidad se construye a través de capas de color (fondos de diferente luminosidad) y overlays de gradiente sobre imágenes.

**El único shadow del sistema** aparece en `.card-hover` (`0 20px 40px rgba(11,44,87,0.15)`) como respuesta a estado hover — nunca en estado de reposo.

**Overlays de imagen:** Las imágenes del sistema llevan gradiente `linear-gradient(to top, rgba(11,44,87,0.92) 0%, rgba(11,44,87,0.2) 55%, transparent 100%)` para legibilidad del texto superpuesto. Este overlay es parte del sistema visual — es la forma en que el azul profundo "entra" en las fotografías.

### Named Rules
**La Regla Flat-by-Default.** Las superficies están en reposo sin sombra. Si aparece una sombra en estado estático, es un error de drift — no un diseño intencional.

## 5. Components

Los componentes son "firmes y acogedores" — bordes rectos, tipografía uppercase espaciada, transiciones suaves de 0.2s. Invitan sin gritar.

### Buttons

El sistema tiene 4 variantes de botón, todas en 0px radius. La jerarquía: navy (acción primaria) > gold (acción destacada/CTA) > outline-gold (acción secundaria sobre fondos oscuros) > outline-ivory (acción secundaria sobre fondos de imagen).

- **Shape:** Sin radio (0px). Bordes rectos en todos los contextos.
- **btn-navy (primario):** Fondo Azul Profundo, texto Marfil, padding 14px 40px. Hover: fondo Oro Cálido, texto Azul Profundo. Transición 0.2s.
- **btn-gold (destacado):** Fondo Oro Cálido, texto Azul Profundo. Hover: fondo Marfil. Usado para CTAs principales en hero de variantes B y C.
- **btn-outline-gold (secundario):** Fondo transparente, borde 1px Oro Cálido, texto Oro Cálido. Hover: fill gold. Usado para WhatsApp, "Reservar" por habitación, acciones secundarias sobre fondos oscuros.
- **btn-outline-ivory (terciario):** Fondo transparente, borde 1px rgba(Marfil, 50%), texto Marfil. Hover: fill ivory. Solo sobre imágenes o fondos muy oscuros.

**Tipografía en botones:** Montserrat 11px, letter-spacing 0.2em, UPPERCASE. No excepciones.

### Navigation

- **Estilo:** Montserrat 10px, letter-spacing 0.2em, UPPERCASE. Opacity 0.6 en reposo, 1.0 en hover. Transición opacity 0.2s.
- **Dark (nav-link-dark):** Texto Azul Profundo. Para navbars sobre fondos claros (Marfil, Arena).
- **Light (nav-link-light):** Texto Marfil. Para navbars sobre fondos oscuros o imágenes.
- **Navbar scroll:** Transición de transparente a filled (Marfil o Azul Profundo según variante) al pasar 20-60px de scroll. Backdrop-filter blur(8-12px) en variantes A y C.

### Image Cards (Habitaciones)

- **Corner Style:** 0px radius (siempre).
- **Background:** Overlay `linear-gradient(to top, rgba(11,44,87,0.92) 0%, rgba(11,44,87,0.2) 55%, transparent 100%)` sobre imagen.
- **Texto superpuesto:** Kicker gold (9px Montserrat uppercase) + H3 Cormorant 24px Marfil + descripción 11px Arena Cálida opacity 0.85.
- **CTA por card:** `btn-outline-gold` en esquina inferior derecha o debajo del texto. `flex-shrink: 0; white-space: nowrap`.

### Separador Gold

Ornamento decorativo mínimo del sistema — línea horizontal de 1px de alto, 28–48px de ancho, color Oro Cálido, opacity 0.5–1.0. Reemplaza íconos decorativos. Aparece antes de h2 en secciones oscuras y antes de labels en context de servicios.

## 6. Do's and Don'ts

### Do:
- **Do** usar Cormorant Garamond para todos los títulos (H1–H3) sin excepción. La fuente ES la voz del hotel.
- **Do** mantener bordes rectos (0px radius) en todos los componentes — botones, cards, contenedores, badges.
- **Do** usar gradiente azul profundo en overlay de imágenes para integrarlas al sistema cromático.
- **Do** posicionar el Oro Cálido como detalle escaso: líneas, labels, bordes, íconos de estrella. Nunca como fondo de sección entera salvo en el CTA de reserva.
- **Do** mostrar el teléfono y WhatsApp como accesos de alta prioridad — el usuario argentino prefiere contacto directo y debe encontrarlo antes de decidir.
- **Do** usar `loading="lazy"` en todas las imágenes que no sean hero de primera vista.
- **Do** incluir un CTA "Reservar" por habitación individual — el path to booking debe ser inmediato desde cualquier punto del scroll.

### Don't:
- **Don't** usar bordes redondeados (`border-radius > 0`) en ningún componente. Si aparece un `border-radius`, es drift.
- **Don't** usar emojis como íconos en ninguna sección. Son incompatibles con el tono premium del hotel. Reemplazar siempre con separadores gold (línea 1px) o sin ícono.
- **Don't** hacer que el sitio parezca una OTA (Booking, Expedia): sin calendarios de búsqueda en el hero, sin tablas de precios comparativas frías, sin el formato "Mejor precio garantizado" como mensaje principal.
- **Don't** usar fondos blancos puros (`#ffffff`) como color base. El Marfil (#F5F1EA) es el blanco del sistema — siempre ligeramente cálido.
- **Don't** poner texto `g.sand` a opacity < 0.85 sobre fondos oscuros en contextos informativos (nombres, descripciones, datos de contacto). Puede usarse a opacity más baja solo en metadata decorativa.
- **Don't** usar Cormorant Garamond en cuerpos de texto largos (párrafos > 3 líneas). Para eso existe Montserrat.
- **Don't** agregar eyebrows uppercase en cada sección — reservarlos para 2–3 instancias deliberadas. Cada sección no necesita un kicker.
- **Don't** usar el sistema de variante C (dark mode total) para el público objetivo turismo nacional/familias salteñas — el tono puede alienar. Dark mode es una opción experimental, no el default.
- **Don't** concatenar tokens como strings: `g.gold + "15"` para opacidades es un anti-pattern. Usar siempre `rgba(212,169,112,0.08)` o CSS custom properties.
