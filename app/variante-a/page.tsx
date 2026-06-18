"use client";
import { useState, useEffect } from "react";
import SocialProof from "@/components/sections/SocialProof";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

const rooms = [
  { num: "01", name: "Habitación Simple", occ: "1 persona", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", desc: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado completo, aire acondicionado y WiFi de alta velocidad." },
  { num: "02", name: "Doble Matrimonial", occ: "1–2 personas", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80", desc: "Ambiente íntimo y acogedor para parejas. Cama king, baño renovado, televisor LED y atención personalizada." },
  { num: "03", name: "Doble Twin", occ: "1–2 personas + cama extra", img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=900&q=80", desc: "Dos camas individuales para viajeros independientes. Luminoso, espacioso y con posibilidad de cama extra." },
  { num: "04", name: "Suite Matrimonial", occ: "1–2 personas + cama extra", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80", desc: "La habitación más amplia y equipada del hotel. Mayor espacio, decoración cuidada y vista mejorada." },
  { num: "05", name: "Triple", occ: "1–3 personas", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80", desc: "Tres plazas cómodas en un ambiente familiar y funcional. Ideal para grupos y familias en Salta." },
];

const services = [
  { name: "Desayuno buffet", desc: "Incluido en todas las tarifas. Variedad de opciones cada mañana." },
  { name: "WiFi de alta velocidad", desc: "Conectividad en habitaciones y áreas comunes del hotel." },
  { name: "Salones de eventos", desc: "Espacios para reuniones, conferencias y celebraciones." },
  { name: "Ubicación céntrica", desc: "A pasos de la Plaza 9 de Julio y el casco histórico." },
  { name: "Más de 40 años", desc: "Cuatro décadas recibiendo huéspedes con dedicación." },
  { name: "Cuotas y Mercado Pago", desc: "Hasta 3 cuotas sin interés. Visa, Mastercard, Amex y Mercado Pago." },
];

const g = {
  blue: "#123E7A", deep: "#0B2C57", sand: "#D8C2A0",
  ivory: "#F5F1EA", graphite: "#444444", gold: "#d4a970",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

export default function VarianteA() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ backgroundColor: g.ivory, color: g.deep, overflowX: "hidden" }}>

      {/* ── NAVBAR ── centered logo, editorial */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(245,241,234,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? `1px solid ${g.sand}` : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Gold top accent */}
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${g.gold}, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <nav style={{ display: "flex", gap: 36 }}>
            {["Habitaciones", "Servicios"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link-dark">{l}</a>
            ))}
          </nav>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: g.fontG, fontSize: 20, letterSpacing: "0.45em", color: g.deep, fontWeight: 600, lineHeight: 1 }}>WILSON</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 3 }}>
              <div style={{ height: 1, width: 20, background: g.gold }} />
              <span style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.35em", color: g.gold, textTransform: "uppercase" }}>HOTEL ★★★</span>
              <div style={{ height: 1, width: 20, background: g.gold }} />
            </div>
          </div>

          <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {["Galería", "Contacto"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link-dark">{l}</a>
            ))}
            <a href="tel:+543874312211" style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.08em", color: g.gold, textDecoration: "none" }}>
              (387) 431-2211
            </a>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ padding: "10px 24px" }}>Reservar</a>
          </nav>
        </div>
      </header>

      {/* ── HERO ── grand editorial, ivory bg */}
      <section style={{ minHeight: "100vh", paddingTop: 72, position: "relative", display: "flex", alignItems: "center" }}>
        {/* Ghosted background word */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: g.fontG, fontSize: "22vw", color: g.deep, opacity: 0.03,
          letterSpacing: "0.3em", whiteSpace: "nowrap", pointerEvents: "none", fontWeight: 700, userSelect: "none",
        }}>SALTA</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", width: "100%" }}>

          {/* LEFT: text */}
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <div style={{ height: 1, width: 48, background: g.gold }} />
              <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Alvarado 950 · Salta, Argentina</span>
            </div>

            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(72px, 9vw, 130px)", lineHeight: 0.88, color: g.deep, margin: "0 0 16px 0", letterSpacing: "-0.02em" }}>
              Wilson
            </h1>
            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(72px, 9vw, 130px)", lineHeight: 0.88, color: g.gold, fontStyle: "italic", margin: "0 0 36px 0", letterSpacing: "-0.02em" }}>
              Hotel
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span style={{ color: g.gold, fontSize: 20, letterSpacing: 4 }}>★ ★ ★</span>
              <div style={{ height: 1, width: 80, background: g.sand }} />
            </div>

            <p style={{ fontFamily: g.fontG, fontSize: 22, fontStyle: "italic", color: g.deep, opacity: 0.65, lineHeight: 1.55, margin: "0 0 48px 0", maxWidth: 440 }}>
              Hospedate en el corazón de Salta. Tradición, confort y calidez en cada estadía desde 1980.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy">Reservar ahora</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">WhatsApp</a>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 20 }}>
              <span style={{ fontFamily: g.fontM, fontSize: 11, color: g.graphite, opacity: 0.65, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: g.gold }}>✓</span> Mejor precio al reservar directo
              </span>
              <span style={{ fontFamily: g.fontM, fontSize: 11, color: g.graphite, opacity: 0.65, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: g.gold }}>✓</span> Mercado Pago · Cuotas sin interés
              </span>
            </div>
          </div>

          {/* RIGHT: editorial photo collage */}
          <div className="fade-up-1" style={{ position: "relative", height: 620 }}>
            {/* Primary photo — diagonal clip */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: "85%", height: "68%",
              clipPath: "polygon(0 0, 100% 0, 100% 88%, 10% 100%)",
              overflow: "hidden",
            }}>
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80" alt="Habitación Wilson Hotel" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, rgba(11,44,87,0.2))` }} />
            </div>

            {/* Secondary photo */}
            <div style={{
              position: "absolute", bottom: 48, left: 0, width: "52%", height: "38%",
              overflow: "hidden", border: `6px solid ${g.ivory}`,
            }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="Desayuno Wilson Hotel" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Gold decorative frame */}
            <div style={{
              position: "absolute", bottom: 18, left: -12, right: 56, height: "41%",
              border: `1px solid ${g.gold}`, pointerEvents: "none", zIndex: 0,
            }} />

            {/* Caption badge */}
            <div style={{
              position: "absolute", bottom: 8, right: 8,
              background: g.deep, padding: "10px 16px",
            }}>
              <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>Hotel 3 Estrellas</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: g.deep }}>Descubrí</span>
          <div style={{ width: 1, height: 48, background: g.gold }} />
        </div>
      </section>

      {/* ── PAYMENT STRIPE ── */}
      <section style={{ background: g.deep, padding: "13px 32px", textAlign: "center", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <p style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.14em", color: g.sand, margin: 0, textTransform: "uppercase", opacity: 0.8 }}>
          Mercado Pago &nbsp;·&nbsp; Hasta 3 cuotas sin interés &nbsp;·&nbsp; Visa &nbsp;·&nbsp; Mastercard &nbsp;·&nbsp; American Express &nbsp;·&nbsp; Pago en destino
        </p>
      </section>

      {/* ── QUOTE BAND ── */}
      <section style={{ background: g.deep, padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center", marginBottom: 28 }}>
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: g.gold, opacity: 0.4 }} />
            <span style={{ color: g.gold, fontSize: 18 }}>✦</span>
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: g.gold, opacity: 0.4 }} />
          </div>
          <p style={{ fontFamily: g.fontG, fontSize: "clamp(22px, 3.5vw, 40px)", fontStyle: "italic", color: g.ivory, lineHeight: 1.45, letterSpacing: "0.01em" }}>
            "Más de 40 años recibiendo huéspedes con dedicación.<br />
            Calidad, comodidad y calidez en cada estadía."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center", marginTop: 28 }}>
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: g.gold, opacity: 0.4 }} />
            <span style={{ color: g.gold, fontSize: 18 }}>✦</span>
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: g.gold, opacity: 0.4 }} />
          </div>
        </div>
      </section>

      <SocialProof variant="light" />

      {/* ── HABITACIONES ── editorial alternating photo-essay */}
      <section id="habitaciones" style={{ padding: "100px 32px", background: g.ivory }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 72 }}>
            <div>
              <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Nuestras habitaciones</span>
              <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(40px, 5.5vw, 72px)", color: g.deep, margin: 0, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
                Espacios<br />para el descanso
              </h2>
            </div>
            <div style={{ flex: 1, height: 1, background: g.sand, marginBottom: 8 }} />
          </div>

          {rooms.map((room, i) => (
            <div key={room.num} style={{ borderTop: `1px solid ${g.sand}`, padding: "52px 0", display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 0 }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ position: "relative", overflow: "hidden", height: 320 }}>
                    <img src={room.img} alt={room.name} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: g.fontG, fontSize: 80, color: "white", opacity: 0.25, lineHeight: 1, userSelect: "none" }}>{room.num}</div>
                  </div>
                  <div style={{ padding: "24px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: g.gold, marginBottom: 10, display: "block" }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 36, color: g.deep, margin: "0 0 16px 0" }}>{room.name}</h3>
                    <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite, lineHeight: 1.75, margin: "0 0 24px 0", maxWidth: 380 }}>{room.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <div style={{ height: 1, width: 28, background: g.gold }} />
                      <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep, opacity: 0.45 }}>Desayuno incluido</span>
                    </div>
                    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ alignSelf: "flex-start", fontSize: 11, padding: "10px 24px" }}>Reservar</a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "24px 56px 24px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: g.gold, marginBottom: 10, display: "block" }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 36, color: g.deep, margin: "0 0 16px 0" }}>{room.name}</h3>
                    <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite, lineHeight: 1.75, margin: "0 0 24px 0", maxWidth: 380 }}>{room.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <div style={{ height: 1, width: 28, background: g.gold }} />
                      <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep, opacity: 0.45 }}>Desayuno incluido</span>
                    </div>
                    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ alignSelf: "flex-start", fontSize: 11, padding: "10px 24px" }}>Reservar</a>
                  </div>
                  <div style={{ position: "relative", overflow: "hidden", height: 320 }}>
                    <img src={room.img} alt={room.name} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 16, right: 16, fontFamily: g.fontG, fontSize: 80, color: "white", opacity: 0.25, lineHeight: 1, userSelect: "none" }}>{room.num}</div>
                  </div>
                </>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${g.sand}` }} />
        </div>
      </section>

      {/* ── TARIFAS ── 3 columns on navy */}
      <section id="tarifas" style={{ background: g.deep, padding: "0 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { name: "Alojamiento y Desayuno", tag: "Reembolsable · Pago en hotel", desc: "Cancelación gratuita hasta 72hs antes del arribo. Garantía con tarjeta de crédito.", featured: false },
            { name: "Último Minuto", tag: "Oferta — No reembolsable", desc: "15% de descuento sobre la tarifa base. Pago anticipado total con tarjeta de crédito.", featured: true },
            { name: "No Reembolsable", tag: "10% descuento · Sin reembolso", desc: "Precio especial con pago anticipado. Sin posibilidad de reembolso una vez confirmada.", featured: false },
          ].map((t, i) => (
            <div key={i} style={{ padding: "56px 40px", borderRight: i < 2 ? `1px solid rgba(255,255,255,0.08)` : "none", background: t.featured ? g.gold : "transparent" }}>
              <span style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: t.featured ? g.deep : g.gold, display: "block", marginBottom: 14, opacity: t.featured ? 1 : 0.9 }}>{t.tag}</span>
              <h3 style={{ fontFamily: g.fontG, fontSize: 28, color: t.featured ? g.deep : g.ivory, margin: "0 0 16px 0" }}>{t.name}</h3>
              <p style={{ fontFamily: g.fontM, fontSize: 12, color: t.featured ? g.deep : g.sand, lineHeight: 1.75, margin: "0 0 28px 0", opacity: t.featured ? 0.8 : 0.7 }}>{t.desc}</p>
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", fontFamily: g.fontM, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
                padding: "10px 24px", border: `1px solid ${t.featured ? g.deep : g.gold}`,
                color: t.featured ? g.deep : g.gold,
              }}>Reservar →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ── clean ivory grid */}
      <section id="servicios" style={{ background: g.ivory, padding: "96px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Servicios & amenidades</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4.5vw, 62px)", color: g.deep, margin: 0, lineHeight: 0.95 }}>Todo lo que necesitás</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: g.sand }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: "36px 32px", background: g.ivory }}>
                <div style={{ width: 36, height: 1, background: g.gold, marginBottom: 20 }} />
                <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.deep, margin: "0 0 10px 0" }}>{s.name}</h3>
                <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.graphite, lineHeight: 1.7, margin: 0, opacity: 0.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── editorial grid */}
      <section id="galería" style={{ padding: "96px 32px", background: g.ivory }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Galería</span>
              <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4.5vw, 62px)", color: g.deep, margin: 0 }}>Descubrí el hotel</h2>
            </div>
            <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer" className="link-gold" style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              @wilsonhotel.salta →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 240px)", gap: 8 }}>
            {[
              { img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", alt: "Habitación doble", col: "span 2", row: "span 2" },
              { img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", alt: "Doble twin", col: undefined, row: undefined },
              { img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", alt: "Baño privado", col: undefined, row: undefined },
              { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Desayuno buffet", col: undefined, row: undefined },
              { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", alt: "Suite", col: undefined, row: undefined },
              { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Fachada", col: undefined, row: undefined },
            ].map((p, i) => (
              <div key={i} style={{ overflow: "hidden", gridColumn: p.col, gridRow: p.row }}>
                <img src={p.img} alt={p.alt} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOOKING ── gold section */}
      <section style={{ background: g.gold, padding: "96px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.deep, opacity: 0.65, display: "block", marginBottom: 20 }}>Reservas online · Mejor precio garantizado</span>
          <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(48px, 7vw, 96px)", color: g.deep, margin: "0 0 12px 0", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
            Reservá<br /><em>tu estadía</em>
          </h2>
          <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.deep, opacity: 0.6, margin: "24px 0 40px 0", lineHeight: 1.7 }}>
            Desayuno buffet incluido en todas las tarifas.<br />
            Cancelación gratuita hasta 72hs antes del check-in.
          </p>
          <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy">Ver disponibilidad →</a>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: "96px 32px", background: g.ivory }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Cómo llegar</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4vw, 56px)", color: g.deep, margin: "0 0 40px 0" }}>Contacto</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "Dirección", text: "Alvarado 950, Salta Capital", href: undefined },
                { label: "Teléfono", text: "(+54 387) 4-312211", href: "tel:+543874312211" },
                { label: "Email", text: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", text: "Consultas directas", href: "https://wa.me/543874312211" },
                { label: "Instagram", text: "@wilsonhotel.salta", href: "https://instagram.com/wilsonhotel.salta" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 24, borderBottom: `1px solid ${g.sand}`, padding: "16px 0" }}>
                  <span style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: g.gold, width: 72, flexShrink: 0, paddingTop: 3 }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: g.fontM, fontSize: 13, color: g.deep, textDecoration: "none" }} className="nav-link-dark" >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.graphite, opacity: 0.45, marginTop: 24, lineHeight: 1.7 }}>
              Check-in: 14:00 hs · Check-out: 10:00 hs<br />
              Cancelación gratuita hasta 72hs antes · IVA 21% incluido
            </p>
          </div>
          <div style={{ height: 460, overflow: "hidden" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Wilson Hotel" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: g.deep, padding: "40px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: g.fontG, fontSize: 18, letterSpacing: "0.45em", color: g.ivory, fontWeight: 600 }}>WILSON</div>
            <div style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.35em", color: g.gold, textTransform: "uppercase" }}>HOTEL ★★★</div>
          </div>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.4, textAlign: "center" }}>
            © {new Date().getFullYear()} Wilson Hotel S.A. · Todos los derechos reservados
          </p>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.4, textAlign: "right" }}>
            reservas@wilsonhotel.com.ar<br />IVA 21% incluido
          </p>
        </div>
      </footer>
      {/* ── WHATSAPP FLOTANTE ── */}
      <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer"
        title="Consultanos por WhatsApp"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.35)", textDecoration: "none",
        }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
