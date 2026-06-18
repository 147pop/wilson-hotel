"use client";
import { useState, useEffect } from "react";
import SocialProof from "@/components/sections/SocialProof";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

const rooms = [
  { name: "Habitación Simple", occ: "1 persona", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", desc: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado, AC y WiFi." },
  { name: "Doble Matrimonial", occ: "1–2 personas", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80", desc: "Ambiente acogedor para parejas. Cama king, baño renovado, TV LED y refrigerador." },
  { name: "Doble Twin", occ: "1–2 + extra", img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=900&q=80", desc: "Dos camas individuales, luminoso y espacioso. Cama extra disponible a pedido." },
  { name: "Suite Matrimonial", occ: "1–2 + extra", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80", desc: "La más amplia del hotel. Mayor espacio, decoración refinada y vista mejorada." },
  { name: "Triple", occ: "1–3 personas", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80", desc: "Tres plazas en ambiente funcional y acogedor. Ideal para familias y grupos pequeños." },
];

const g = {
  blue: "#123E7A", deep: "#0B2C57", sand: "#D8C2A0",
  ivory: "#F5F1EA", graphite: "#444444", gold: "#d4a970",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

export default function VarianteB() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ color: g.deep, overflowX: "hidden" }}>

      {/* ── NAVBAR ── ivory bg, standard left-right */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: g.ivory,
        borderBottom: `2px solid ${scrollY > 20 ? g.blue : g.sand}`,
        transition: "border-color 0.4s ease",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo block */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: g.deep, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: g.fontG, fontSize: 20, color: g.ivory, fontWeight: 700 }}>W</span>
              </div>
              <div>
                <div style={{ fontFamily: g.fontG, fontSize: 16, letterSpacing: "0.3em", color: g.deep, fontWeight: 600, lineHeight: 1 }}>WILSON</div>
                <div style={{ fontFamily: g.fontM, fontSize: 7, letterSpacing: "0.3em", color: g.gold, textTransform: "uppercase" }}>HOTEL ★★★</div>
              </div>
            </div>
          </div>

          <nav aria-label="Navegación principal" style={{ display: "flex", gap: 32 }}>
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link-dark">{l}</a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 12 }}>
            <a href="tel:+543874312211" style={{ fontFamily: g.fontM, fontSize: 10, color: g.graphite, textDecoration: "none", opacity: 0.82, letterSpacing: "0.05em" }}>(387) 4-312211</a>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ padding: "9px 22px" }}>Reservar</a>
          </div>
        </div>
        {/* Gold bottom accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${g.deep} 0%, ${g.gold} 50%, ${g.deep} 100%)` }} />
      </header>

      {/* ── HERO ── bold split: navy left (tall), ivory right */}
      <section style={{ paddingTop: 71, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* LEFT: dark navy */}
        <div style={{ background: g.deep, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px", position: "relative", overflow: "hidden" }}>
          {/* Large decorative letter */}
          <div style={{ position: "absolute", top: "-5%", left: "-8%", fontFamily: g.fontG, fontSize: "55vw", color: "white", opacity: 0.02, lineHeight: 1, userSelect: "none", pointerEvents: "none", fontWeight: 700 }}>W</div>

          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Hotel 3 Estrellas · Salta</span>
              <div style={{ height: 1, flex: 1, background: g.gold, opacity: 0.3 }} />
            </div>

            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(56px, 7vw, 100px)", lineHeight: 0.88, color: g.ivory, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              Hospedate<br />
              <span style={{ color: g.gold, fontStyle: "italic" }}>en el corazón</span><br />
              de Salta
            </h1>

            <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.75, margin: "0 0 44px 0", maxWidth: 400, opacity: 0.8 }}>
              Alvarado 950 — a pasos de la Plaza 9 de Julio. Desayuno buffet incluido, más de 40 años de trayectoria y atención personalizada.
            </p>

            <div style={{ display: "flex", gap: 14 }}>
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold">Reservar ahora</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-ivory">WhatsApp</a>
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { num: "40+", label: "Años de trayectoria" },
              { num: "5", label: "Tipos de habitación" },
              { num: "★★★", label: "Hotel categoría" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 24px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ fontFamily: g.fontG, fontSize: 28, color: g.gold, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: g.sand, opacity: 0.78, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: photo full height */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
            alt="Wilson Hotel habitación"
            className="img-zoom"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,44,87,0.3) 0%, transparent 60%)" }} />
          {/* Badge */}
          <div style={{ position: "absolute", top: 40, right: 32, background: g.gold, padding: "12px 20px" }}>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep, display: "block" }}>Desayuno</span>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>incluido</span>
          </div>
        </div>
      </section>

      <SocialProof variant="sand" />

      {/* ── HABITACIONES ── dark cards grid */}
      <section id="habitaciones" style={{ background: g.blue, padding: "96px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Habitaciones</span>
              <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4.5vw, 64px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>Nuestros espacios</h2>
            </div>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ flexShrink: 0 }}>Ver disponibilidad</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {rooms.slice(0, 3).map((room, i) => (
              <div key={i} style={{ position: "relative", height: 380, overflow: "hidden" }}>
                <img src={room.img} alt={room.name} loading="lazy" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,87,0.92) 0%, rgba(11,44,87,0.3) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 6 }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{room.desc}</p>
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 9, padding: "10px 20px", flexShrink: 0, whiteSpace: "nowrap" }}>Reservar</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 2 }}>
            {rooms.slice(3).map((room, i) => (
              <div key={i} style={{ position: "relative", height: 300, overflow: "hidden" }}>
                <img src={room.img} alt={room.name} loading="lazy" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,87,0.92) 0%, rgba(11,44,87,0.2) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 6 }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{room.desc}</p>
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 9, padding: "10px 20px", flexShrink: 0, whiteSpace: "nowrap" }}>Reservar</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFAS ── ivory section, 3 blocks */}
      <section style={{ background: g.ivory, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Planes tarifarios</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: 0 }}>Elegí tu tarifa</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { name: "Alojamiento y Desayuno", tag: "Reembolsable", desc: "Cancelación gratuita 72hs antes. Garantía con tarjeta de crédito. Pago en el hotel.", border: g.sand },
              { name: "Último Minuto", tag: "Oferta — No reembolsable", desc: "15% de descuento sobre tarifa base. Pago anticipado con TC. Mejor precio garantizado.", border: g.gold, featured: true },
              { name: "No Reembolsable", tag: "10% de descuento", desc: "Precio especial con pago anticipado total. Sin posibilidad de reembolso.", border: g.sand },
            ].map((t, i) => (
              <div key={i} style={{ border: `2px solid ${t.featured ? g.gold : g.sand}`, padding: "36px 32px", position: "relative", background: t.featured ? "rgba(212,169,112,0.08)" : "white" }}>
                {t.featured && <div style={{ position: "absolute", top: -12, left: 24, background: g.gold, padding: "4px 16px", fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>Recomendada</div>}
                <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>{t.tag}</span>
                <h3 style={{ fontFamily: g.fontG, fontSize: 26, color: g.deep, margin: "0 0 14px 0" }}>{t.name}</h3>
                <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.graphite, lineHeight: 1.7, margin: 0, opacity: 0.88 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── alternating full-width rows */}
      <section id="servicios" style={{ background: g.deep }}>
        {[
          { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", title: "Desayuno buffet incluido", desc: "Cada mañana, un desayuno completo te espera. Jugos naturales, facturas, tostadas, fiambres, frutas y más. Incluido en todas las tarifas sin excepción.", reverse: false },
          { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80", title: "Ubicación inmejorable", desc: "Alvarado 950, a dos cuadras de la Plaza 9 de Julio. El centro histórico de Salta a tu alcance: catedrales, museos, gastronomía y cultura a pasos del hotel.", reverse: true },
        ].map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: i > 0 ? `1px solid rgba(255,255,255,0.06)` : "none" }}>
            {s.reverse ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 64px" }}>
                  <div style={{ width: 40, height: 2, background: g.gold, marginBottom: 28 }} />
                  <h3 style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 3.5vw, 48px)", color: g.ivory, margin: "0 0 20px 0" }}>{s.title}</h3>
                  <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.8, margin: 0, maxWidth: 440, opacity: 0.8 }}>{s.desc}</p>
                </div>
                <div style={{ height: 360, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} loading="lazy" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </>
            ) : (
              <>
                <div style={{ height: 360, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} loading="lazy" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 64px" }}>
                  <div style={{ width: 40, height: 2, background: g.gold, marginBottom: 28 }} />
                  <h3 style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 3.5vw, 48px)", color: g.ivory, margin: "0 0 20px 0" }}>{s.title}</h3>
                  <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.8, margin: 0, maxWidth: 440, opacity: 0.8 }}>{s.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}
        {/* Services grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { name: "WiFi gratuito", desc: "Alta velocidad en todo el hotel" },
            { name: "Salones eventos", desc: "Para grupos y reuniones" },
            { name: "Pago con tarjeta", desc: "Visa, MC, Amex aceptadas" },
            { name: "40+ años", desc: "Atención personalizada siempre" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "36px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ width: 28, height: 1, background: g.gold, marginBottom: 20, opacity: 0.7 }} />
              <h4 style={{ fontFamily: g.fontG, fontSize: 20, color: g.ivory, margin: "0 0 6px 0" }}>{s.name}</h4>
              <p style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, margin: 0, opacity: 0.82, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERÍA ── tight masonry no gaps */}
      <section id="galería" style={{ background: g.sand }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "240px 240px" }}>
          {[
            { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80", alt: "Suite", col: undefined },
            { img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=700&q=80", alt: "Baño" },
            { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", alt: "Desayuno" },
            { img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80", alt: "Twin" },
            { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80", alt: "Hotel" },
            { img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=700&q=80", alt: "Habitación" },
          ].map((p, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img src={p.img} alt={p.alt} loading="lazy" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
        <div style={{ background: g.deep, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.78 }}>Galería de imágenes</span>
          <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, textDecoration: "none" }}>@wilsonhotel.salta →</a>
        </div>
      </section>

      {/* ── BOOKING CTA ── sand bg, bold contrast */}
      <section style={{ background: g.sand, padding: "96px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.deep, opacity: 0.7, display: "block", marginBottom: 16 }}>Mejor precio garantizado</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(48px, 6.5vw, 88px)", color: g.deep, margin: "0 0 20px 0", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              Reservá<br />directamente
            </h2>
            <p style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
              Reservando directo con nosotros obtenés el mejor precio disponible. Cancelación gratuita hasta 72hs antes. IVA incluido.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ textAlign: "center", fontSize: 12, padding: "18px 40px" }}>
              Ver disponibilidad online →
            </a>
            <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: g.deep, textDecoration: "none", border: `1px solid rgba(11,44,87,0.3)`, padding: "16px 40px", opacity: 0.88, transition: "opacity 0.2s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4a970"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Consultar por WhatsApp
            </a>
            <a href="tel:+543874312211" style={{ fontFamily: g.fontM, fontSize: 11, color: g.deep, textDecoration: "none", textAlign: "center", opacity: 0.78, letterSpacing: "0.05em" }}>
              (+54 387) 4-312211
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ background: g.ivory, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 10 }}>Cómo llegar</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: "0 0 32px 0" }}>Ubicación</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { label: "Dirección", val: "Alvarado 950, Salta Capital" },
                { label: "Teléfono", val: "(+54 387) 4-312211", href: "tel:+543874312211" },
                { label: "Email", val: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", val: "Consultas directas", href: "https://wa.me/543874312211" },
                { label: "Check-in", val: "14:00 hs" },
                { label: "Check-out", val: "10:00 hs" },
              ].map(item => (
                <div key={item.label} style={{ padding: "16px 0", borderBottom: `1px solid ${g.sand}` }}>
                  <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 4 }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: g.fontM, fontSize: 13, color: g.deep, textDecoration: "none" }}>{item.val}</a>
                  ) : (
                    <span style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite }}>{item.val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 420, overflow: "hidden" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Wilson Hotel ubicación" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: g.deep }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${g.deep}, ${g.gold}, ${g.deep})` }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: g.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: g.fontG, fontSize: 16, color: g.deep, fontWeight: 700 }}>W</span>
            </div>
            <div>
              <div style={{ fontFamily: g.fontG, fontSize: 14, letterSpacing: "0.3em", color: g.ivory, fontWeight: 600 }}>WILSON</div>
              <div style={{ fontFamily: g.fontM, fontSize: 7, letterSpacing: "0.25em", color: g.gold, textTransform: "uppercase" }}>HOTEL ★★★</div>
            </div>
          </div>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.72 }}>© {new Date().getFullYear()} Wilson Hotel S.A.</p>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.72 }}>IVA 21% incluido · reservas@wilsonhotel.com.ar</p>
        </div>
      </footer>
    </main>
  );
}
