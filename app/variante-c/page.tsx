"use client";
import { useState, useEffect } from "react";
import SocialProof from "@/components/sections/SocialProof";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import LogoIsotipo from "@/components/brand/LogoIsotipo";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

const rooms = [
  { name: "Simple", occ: "1 persona", img: "/hotel/habitaciones/single-standard/single-standard-03.webp", desc: "Cama matrimonial, baño privado, AC y WiFi." },
  { name: "Doble Matrimonial", occ: "1–2 personas", img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp", desc: "Cama king, baño renovado, TV LED y refrigerador." },
  { name: "Doble Twin", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-single/doble-single-01.webp", desc: "Dos camas individuales. Posibilidad de cama extra." },
  { name: "Suite Matrimonial", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", desc: "La habitación más amplia y equipada del hotel." },
  { name: "Triple", occ: "1–3 personas", img: "/hotel/habitaciones/triple-ms/triple-ms-01.webp", desc: "Tres plazas para familias y grupos pequeños." },
];

const g = {
  blue: "#123E7A", deep: "#0B2C57", sand: "#D8C2A0",
  ivory: "#F5F1EA", graphite: "#444444", gold: "#d4a970",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

const Rule = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0" }}>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${g.gold}, transparent)`, opacity: 0.4 }} />
    <div style={{ width: 4, height: 4, background: g.gold, transform: "rotate(45deg)", opacity: 0.7 }} />
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${g.gold}, transparent)`, opacity: 0.4 }} />
  </div>
);

export default function VarianteC() {
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ background: g.deep, color: g.ivory, overflowX: "hidden" }}>

      {/* NAVBAR */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(11,44,87,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,169,112,0.2)" : "none",
        transition: "all 0.5s ease",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><LogoHorizontal variant="light" size={40} /></div>
          <nav style={{ display: "flex", gap: 40 }}>
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link-light">{l}</a>
            ))}
          </nav>
          <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ padding: "9px 28px" }}>Reservar</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)", overflow: "hidden" }}>
          <img src="/hotel/amenities/home/home-01.webp" alt="Wilson Hotel" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,44,87,0.75) 0%, rgba(11,44,87,0.1) 60%, transparent 100%)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,44,87,0.65) 0%, rgba(11,44,87,0.25) 50%, transparent 100%)" }} />
        <div className="reveal-draw" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${g.gold} 0%, transparent 60%)`, opacity: 0.4 }} />
        <div className="reveal-draw reveal-d2" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${g.gold} 0%, transparent 70%)`, opacity: 0.25 }} />
        <div className="reveal-draw reveal-d3" style={{ position: "absolute", left: 40, top: 80, bottom: 80, width: 1, background: `linear-gradient(to bottom, transparent, ${g.gold}, transparent)`, opacity: 0.3 }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "120px 80px 120px 80px", width: "100%" }}>
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
              <div style={{ height: 1, width: 56, background: g.gold, opacity: 0.6 }} />
              <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: g.gold }}>Alvarado 950 · Salta, Argentina</span>
            </div>
            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(64px, 10vw, 148px)", lineHeight: 0.85, color: g.ivory, margin: "0 0 8px 0", letterSpacing: "-0.03em", maxWidth: "70vw" }}>
              En el<br />
              <em style={{ color: g.gold }}>corazón</em><br />
              de Salta
            </h1>
            <div style={{ margin: "36px 0" }}><Rule /></div>
            <p style={{ fontFamily: g.fontG, fontSize: "clamp(18px, 2vw, 26px)", fontStyle: "italic", color: g.sand, lineHeight: 1.5, margin: "0 0 48px 0", maxWidth: 520, opacity: 0.85 }}>
              Más de 40 años de tradición hotelera. Confort, calidez y atención personalizada en el centro histórico.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 12, padding: "16px 44px" }}>Reservar ahora</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 12, padding: "16px 44px" }}>WhatsApp</a>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 80px" }}>
            <div style={{ borderTop: "1px solid rgba(212,169,112,0.15)", display: "flex", gap: 48, padding: "24px 0" }}>
              {[
                { num: "40+", label: "Años de trayectoria" },
                { num: "5", label: "Tipos de habitación" },
                { num: "3", label: "Estrellas" },
                { num: "✓", label: "Desayuno incluido" },
              ].map((s, i) => (
                <div key={i} className={`reveal reveal-d${i + 1}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ fontFamily: g.fontG, fontSize: 24, color: g.gold, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ height: 20, width: 1, background: g.gold, opacity: 0.2 }} />
                  <div style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.78, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HABITACIONES */}
      <section id="habitaciones" style={{ background: "#091f40", padding: "96px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ marginBottom: 56 }}>
            <div className="reveal-draw" style={{ height: 1, width: 40, background: g.gold, marginBottom: 20, opacity: 0.5 }} />
            <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 5vw, 68px)", color: g.ivory, margin: 0, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              Nuestras<br /><em style={{ color: g.gold }}>habitaciones</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {rooms.map((room, i) => (
              <div key={i} className={`reveal-clip reveal-d${i + 1}`} style={{ display: "grid", gridTemplateColumns: "280px 1fr", overflow: "hidden", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)" }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={room.img} alt={room.name} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.85)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(9,31,64,0.3))" }} />
                </div>
                <div style={{ padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", borderLeft: "1px solid rgba(212,169,112,0.1)" }}>
                  <div>
                    <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 8, opacity: 0.9 }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 32, color: g.ivory, margin: "0 0 10px 0" }}>{room.name}</h3>
                    <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, margin: 0, lineHeight: 1.7, opacity: 0.82, maxWidth: 400 }}>{room.desc} Desayuno buffet incluido.</p>
                  </div>
                  <div style={{ flexShrink: 0, paddingLeft: 48 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 20, height: 1, background: g.gold, opacity: 0.5 }} />
                      <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.72 }}>Disponible</span>
                    </div>
                    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 9, padding: "10px 24px", display: "block", textAlign: "center" }}>Reservar</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ background: g.deep, padding: "80px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal-draw-center"><Rule /></div>
          <p className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 4vw, 56px)", fontStyle: "italic", color: g.sand, lineHeight: 1.35, margin: "48px 0", textAlign: "center", letterSpacing: "0.01em", opacity: 0.9 }}>
            "Calidad, comodidad y calidez.<br />
            En el corazón de Salta desde 1980."
          </p>
          <div className="reveal-draw-center"><Rule /></div>
        </div>
      </section>

      <SocialProof variant="dark" />

      {/* SERVICIOS */}
      <section id="servicios" style={{ background: "#091f40", padding: "80px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="reveal-draw" style={{ height: 1, width: 40, background: g.gold, marginBottom: 20, opacity: 0.5 }} />
            <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: "0 0 40px 0", lineHeight: 0.92 }}>
              Servicios<br /><em style={{ color: g.gold }}>y amenidades</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { name: "Desayuno buffet incluido", desc: "En todas las tarifas, sin excepción." },
                { name: "WiFi gratuito", desc: "Alta velocidad en habitaciones y áreas comunes." },
                { name: "Salones de eventos", desc: "Para grupos, reuniones y conferencias." },
                { name: "Ubicación céntrica", desc: "Alvarado 950, a pasos de Plaza 9 de Julio." },
                { name: "Pago con tarjeta", desc: "Visa, Mastercard y American Express." },
              ].map((s, i) => (
                <div key={i} className={`reveal reveal-d${i + 1}`} style={{ borderTop: "1px solid rgba(212,169,112,0.12)", padding: "20px 0", display: "flex", gap: 20, alignItems: "center" }}>
                  <div style={{ width: 6, height: 6, background: g.gold, flexShrink: 0, transform: "rotate(45deg)", opacity: 0.7 }} />
                  <div>
                    <span style={{ fontFamily: g.fontG, fontSize: 22, color: g.ivory, display: "block" }}>{s.name}</span>
                    <span style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, opacity: 0.82 }}>{s.desc}</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(212,169,112,0.12)" }} />
            </div>
          </div>

          {/* Tarifas */}
          <div>
            <div className="reveal-draw" style={{ height: 1, width: 40, background: g.gold, marginBottom: 20, opacity: 0.5 }} />
            <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: "0 0 40px 0", lineHeight: 0.92 }}>
              Planes<br /><em style={{ color: g.gold }}>tarifarios</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { name: "Alojamiento y Desayuno", tag: "Reembolsable · Pago en hotel", featured: false },
                { name: "Último Minuto", tag: "−15% · No reembolsable · Pago anticipado", featured: true },
                { name: "No Reembolsable", tag: "−10% · Pago anticipado", featured: false },
              ].map((t, i) => (
                <div key={i} className={`reveal reveal-d${i + 1}`} style={{
                  padding: "24px 28px",
                  background: t.featured ? "rgba(212,169,112,0.12)" : "rgba(255,255,255,0.03)",
                  border: t.featured ? "1px solid rgba(212,169,112,0.35)" : "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                }}>
                  {t.featured && (
                    <div style={{ position: "absolute", top: -1, right: 16, background: g.gold, padding: "3px 12px", fontFamily: g.fontM, fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>OFERTA</div>
                  )}
                  <div style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, marginBottom: 6, opacity: 0.8 }}>{t.tag}</div>
                  <div style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory }}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galería" style={{ background: g.deep, padding: "80px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px", marginBottom: 40 }}>
          <div className="reveal-draw" style={{ height: 1, width: 40, background: g.gold, marginBottom: 20, opacity: 0.5 }} />
          <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>
            Galería<br /><em style={{ color: g.gold }}>de imágenes</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", height: 420, gap: 3 }}>
          {[
            { img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp", alt: "Habitación", style: { clipPath: "polygon(0 0, 90% 0, 100% 100%, 0 100%)" } },
            { img: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Twin", style: { clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" } },
            { img: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno", style: {} },
            { img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite", style: { clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" } },
            { img: "/hotel/amenities/fachada/fachada-01.webp", alt: "Fachada", style: { clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" } },
          ].map((p, i) => (
            <div key={i} className={`reveal-scale reveal-d${i + 1}`} style={{ overflow: "hidden", ...p.style }}>
              <img src={p.img} alt={p.alt} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.7)" }} />
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1400, margin: "24px auto 0", padding: "0 80px", display: "flex", justifyContent: "flex-end" }}>
          <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: g.gold, textDecoration: "none", opacity: 0.88 }}>
            @wilsonhotel.salta →
          </a>
        </div>
      </section>

      {/* CTA RESERVA */}
      <section className="reveal" style={{ background: "#050f1d", padding: "120px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(212,169,112,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal-draw-center"><Rule /></div>
          <div style={{ margin: "48px 0" }}>
            <span className="reveal reveal-d1" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: g.gold, display: "block", marginBottom: 24, opacity: 0.7 }}>Reservas online · Mejor precio directo</span>
            <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(56px, 9vw, 140px)", color: g.ivory, margin: "0 auto 24px", lineHeight: 0.85, letterSpacing: "-0.03em", maxWidth: 900 }}>
              Reservá tu<br /><em style={{ color: g.gold }}>estadía</em>
            </h2>
            <p className="reveal reveal-d2" style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, opacity: 0.82, lineHeight: 1.7, margin: "0 auto 48px", maxWidth: 520 }}>
              Desayuno incluido · Cancelación gratuita 72hs antes<br />
              IVA 21% incluido · Mejor precio garantizado
            </p>
            <div className="reveal reveal-d3" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 12, padding: "18px 52px" }}>Ver disponibilidad →</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 12, padding: "18px 52px" }}>Consultar por WhatsApp</a>
            </div>
          </div>
          <div className="reveal-draw-center"><Rule /></div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="reveal" style={{ background: "#091f40", padding: "80px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="reveal-draw" style={{ height: 1, width: 40, background: g.gold, marginBottom: 20, opacity: 0.5 }} />
            <h2 className="reveal-blur reveal-d1" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.ivory, margin: "0 0 40px 0" }}>
              Cómo<br /><em style={{ color: g.gold }}>llegar</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Dirección", val: "Alvarado 950, Salta Capital" },
                { label: "Teléfono", val: "(+54 387) 4-312211", href: "tel:+543874312211" },
                { label: "Email", val: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", val: "Consultas directas", href: "https://wa.me/543874312211" },
                { label: "Check-in / out", val: "14:00 hs / 10:00 hs" },
              ].map(item => (
                <div key={item.label} className="reveal reveal-d2" style={{ borderTop: "1px solid rgba(212,169,112,0.1)", padding: "18px 0", display: "flex", gap: 32 }}>
                  <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, opacity: 0.9, width: 80, flexShrink: 0, paddingTop: 3 }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: g.fontM, fontSize: 13, color: g.ivory, textDecoration: "none", opacity: 0.8 }}>{item.val}</a>
                  ) : (
                    <span style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, opacity: 0.88 }}>{item.val}</span>
                  )}
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(212,169,112,0.1)" }} />
            </div>
          </div>
          <div style={{ height: 440, overflow: "hidden", opacity: 0.85 }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, display: "block", filter: "invert(1) hue-rotate(180deg) brightness(0.8)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Wilson Hotel" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050f1d", borderTop: "1px solid rgba(212,169,112,0.12)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><LogoIsotipo variant="gold" size={36} /></div>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.65, textAlign: "center" }}>© {new Date().getFullYear()} Wilson Hotel S.A.</p>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.65 }}>IVA 21% incluido</p>
        </div>
      </footer>
    </main>
  );
}