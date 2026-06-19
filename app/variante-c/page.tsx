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
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[98px] flex items-center justify-between">
          <div><LogoHorizontal variant="light" size={94} /></div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-10">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="nav-link-light">{l}</button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ padding: "9px 28px" }}>Reservar</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            style={{ color: g.ivory }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden px-5 py-4 space-y-3" style={{ background: "rgba(11,44,87,0.98)", borderTop: "1px solid rgba(212,169,112,0.15)" }}>
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left font-montserrat text-sm transition-colors py-1"
                style={{ color: g.sand }}
              >
                {item}
              </button>
            ))}
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full btn-outline-gold text-xs py-2.5 text-center mt-2"
            >
              Reservar ahora
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        {/* Background image — full on mobile, clipped on desktop */}
        <div className="absolute inset-0 md:left-auto md:top-0 md:right-0 md:w-[55%] md:h-full"
          style={{ clipPath: "none" }}>
          <style>{`@media (min-width: 768px) { .hero-clip { clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%) !important; } }`}</style>
          <div className="hero-clip absolute inset-0 overflow-hidden">
            <img src="/hotel/amenities/home/home-01.webp" alt="Wilson Hotel" className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,44,87,0.75) 0%, rgba(11,44,87,0.1) 60%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,44,87,0.65) 0%, rgba(11,44,87,0.25) 50%, transparent 100%)" }} />

        {/* Decorative lines */}
        <div className="reveal-draw absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${g.gold} 0%, transparent 60%)`, opacity: 0.4 }} />
        <div className="reveal-draw reveal-d2 absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${g.gold} 0%, transparent 70%)`, opacity: 0.25 }} />
        <div className="reveal-draw reveal-d3 absolute left-5 md:left-10 top-20 bottom-20 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${g.gold}, transparent)`, opacity: 0.3 }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 sm:px-10 md:px-16 lg:px-20 w-full">
          <div className="fade-up">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="h-px w-10 md:w-14" style={{ background: g.gold, opacity: 0.6 }} />
              <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: g.gold }}>Alvarado 950 · Salta, Argentina</span>
            </div>
            <h1 className="max-w-[70vw]" style={{ fontFamily: g.fontG, fontSize: "clamp(48px, 10vw, 148px)", lineHeight: 0.85, color: g.ivory, margin: "0 0 8px 0", letterSpacing: "-0.03em" }}>
              En el<br />
              <em style={{ color: g.gold }}>corazón</em><br />
              de Salta
            </h1>
            <div className="my-7 md:my-9 max-w-xs"><Rule /></div>
            <p className="max-w-[520px]" style={{ fontFamily: g.fontG, fontSize: "clamp(18px, 2vw, 26px)", fontStyle: "italic", color: g.sand, lineHeight: 1.5, margin: "0 0 48px 0", opacity: 0.85 }}>
              Más de 40 años de tradición hotelera. Confort, calidez y atención personalizada en el centro histórico.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 12, padding: "16px 44px" }}>Reservar ahora</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 12, padding: "16px 44px" }}>WhatsApp</a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: "1px solid rgba(212,169,112,0.15)" }}>
            {[
              { num: "40+", label: "Años de trayectoria" },
              { num: "5", label: "Tipos de habitación" },
              { num: "★★★", label: "Hotel categoría" },
              { num: "✓", label: "Desayuno incluido" },
            ].map((s, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} pt-5 pb-4 pr-5 ${i < 3 ? "sm:border-r" : ""} ${i === 0 ? "border-r" : ""}`} style={{ borderColor: "rgba(212,169,112,0.15)" }}>
                <div style={{ fontFamily: g.fontM, fontSize: 22, color: g.gold, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.78, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HABITACIONES */}
      <section id="habitaciones" className="py-20 md:py-24" style={{ background: "#091f40" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-14">
            <div className="reveal-draw h-px w-10 mb-5" style={{ background: g.gold, opacity: 0.5 }} />
            <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 5vw, 68px)", color: g.ivory, margin: 0, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              Nuestras<br /><em style={{ color: g.gold }}>habitaciones</em>
            </h2>
          </div>

          <div className="flex flex-col gap-0.5">
            {rooms.map((room, i) => (
              <div key={i} className={`reveal-clip reveal-d${i + 1} grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden`}
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)" }}>
                {/* Room image */}
                <div className="h-[200px] md:h-[200px] overflow-hidden relative">
                  <img src={room.img} alt={room.name} className="img-zoom w-full h-full object-cover block" style={{ filter: "brightness(0.85)" }} />
                  <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, transparent 60%, rgba(9,31,64,0.3))" }} />
                </div>
                {/* Room info */}
                <div className="p-5 sm:p-7 md:p-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ borderLeft: "none" }}>
                  <div className="md:border-l md:pl-8 lg:pl-12" style={{ borderColor: "rgba(212,169,112,0.1)" }}>
                    <span className="block mb-2" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, opacity: 0.9 }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 32, color: g.ivory, margin: "0 0 10px 0" }}>{room.name}</h3>
                    <p className="max-w-[400px]" style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, margin: 0, lineHeight: 1.7, opacity: 0.82 }}>{room.desc} Desayuno buffet incluido.</p>
                  </div>
                  <div className="flex-shrink-0 md:pl-8 lg:pl-12">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-px" style={{ background: g.gold, opacity: 0.5 }} />
                      <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.72 }}>Disponible</span>
                    </div>
                    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold block text-center" style={{ fontSize: 9, padding: "10px 24px" }}>Reservar</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="px-6 py-16 sm:px-10 md:px-20 md:py-20" style={{ background: g.deep }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="reveal-draw-center"><Rule /></div>
          <p className="reveal-blur text-center my-10 md:my-12" style={{ fontFamily: g.fontG, fontSize: "clamp(24px, 4vw, 56px)", fontStyle: "italic", color: g.sand, lineHeight: 1.35, letterSpacing: "0.01em", opacity: 0.9 }}>
            &quot;Calidad, comodidad y calidez.<br />
            En el corazón de Salta desde 1980.&quot;
          </p>
          <div className="reveal-draw-center"><Rule /></div>
        </div>
      </section>

      <SocialProof variant="dark" />

      {/* SERVICIOS */}
      <section id="servicios" className="px-5 py-16 sm:px-8 md:px-12 lg:px-20 md:py-20" style={{ background: "#091f40" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
          {/* Services list */}
          <div>
            <div className="reveal-draw h-px w-10 mb-5" style={{ background: g.gold, opacity: 0.5 }} />
            <h2 className="reveal-blur mb-8 md:mb-10" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>
              Servicios<br /><em style={{ color: g.gold }}>y amenidades</em>
            </h2>
            <div className="flex flex-col">
              {[
                { name: "Desayuno buffet incluido", desc: "En todas las tarifas, sin excepción." },
                { name: "WiFi gratuito", desc: "Alta velocidad en habitaciones y áreas comunes." },
                { name: "Salones de eventos", desc: "Para grupos, reuniones y conferencias." },
                { name: "Ubicación céntrica", desc: "Alvarado 950, a pasos de Plaza 9 de Julio." },
                { name: "Pago con tarjeta", desc: "Visa, Mastercard y American Express." },
              ].map((s, i) => (
                <div key={i} className={`reveal reveal-d${i + 1} flex gap-4 md:gap-5 items-center py-4 md:py-5`} style={{ borderTop: "1px solid rgba(212,169,112,0.12)" }}>
                  <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: g.gold, transform: "rotate(45deg)", opacity: 0.7 }} />
                  <div>
                    <span className="block" style={{ fontFamily: g.fontG, fontSize: 22, color: g.ivory }}>{s.name}</span>
                    <span style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, opacity: 0.82 }}>{s.desc}</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(212,169,112,0.12)" }} />
            </div>
          </div>

          {/* Tarifas */}
          <div>
            <div className="reveal-draw h-px w-10 mb-5" style={{ background: g.gold, opacity: 0.5 }} />
            <h2 className="reveal-blur mb-8 md:mb-10" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>
              Planes<br /><em style={{ color: g.gold }}>tarifarios</em>
            </h2>
            <div className="flex flex-col gap-0.5">
              {[
                { name: "Alojamiento y Desayuno", tag: "Reembolsable · Pago en hotel", featured: false },
                { name: "Último Minuto", tag: "−15% · No reembolsable · Pago anticipado", featured: true },
                { name: "No Reembolsable", tag: "−10% · Pago anticipado", featured: false },
              ].map((t, i) => (
                <div key={i} className={`reveal reveal-d${i + 1} p-5 sm:p-6 md:p-7 relative`} style={{
                  background: t.featured ? "rgba(212,169,112,0.12)" : "rgba(255,255,255,0.03)",
                  border: t.featured ? "1px solid rgba(212,169,112,0.35)" : "1px solid rgba(255,255,255,0.05)",
                }}>
                  {t.featured && (
                    <div className="absolute -top-px right-4" style={{ background: g.gold, padding: "3px 12px", fontFamily: g.fontM, fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>OFERTA</div>
                  )}
                  <div className="mb-1.5" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, opacity: 0.8 }}>{t.tag}</div>
                  <div style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory }}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galería" className="py-16 md:py-20 overflow-hidden" style={{ background: g.deep }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 mb-8 md:mb-10">
          <div className="reveal-draw h-px w-10 mb-5" style={{ background: g.gold, opacity: 0.5 }} />
          <h2 className="reveal-blur" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 56px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>
            Galería<br /><em style={{ color: g.gold }}>de imágenes</em>
          </h2>
        </div>

        {/* Gallery grid — 2 cols mobile, 3 cols tablet, 5 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0.5" style={{ height: "auto" }}>
          {[
            { img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp", alt: "Habitación" },
            { img: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Twin" },
            { img: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno" },
            { img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite" },
            { img: "/hotel/amenities/fachada/fachada-01.webp", alt: "Fachada" },
          ].map((p, i) => (
            <div key={i} className={`reveal-scale reveal-d${i + 1} overflow-hidden h-[180px] sm:h-[220px] md:h-[280px] lg:h-[420px]`}>
              <img src={p.img} alt={p.alt} className="img-zoom w-full h-full object-cover block" style={{ filter: "brightness(0.7)" }} />
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto mt-5 md:mt-6 px-5 sm:px-8 md:px-12 lg:px-20 flex justify-end">
          <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: g.gold, textDecoration: "none", opacity: 0.88 }}>
            @wilsonhotel.salta →
          </a>
        </div>
      </section>

      {/* CTA RESERVA */}
      <section className="reveal px-6 py-20 sm:px-10 md:px-20 md:py-[120px] text-center relative overflow-hidden" style={{ background: "#050f1d" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,169,112,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <div className="reveal-draw-center"><Rule /></div>
          <div className="my-10 md:my-12">
            <span className="reveal reveal-d1 block mb-6" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: g.gold, opacity: 0.7 }}>Reservas online · Mejor precio directo</span>
            <h2 className="reveal-blur mx-auto max-w-[900px]" style={{ fontFamily: g.fontG, fontSize: "clamp(44px, 9vw, 140px)", color: g.ivory, margin: "0 auto 24px", lineHeight: 0.85, letterSpacing: "-0.03em" }}>
              Reservá tu<br /><em style={{ color: g.gold }}>estadía</em>
            </h2>
            <p className="reveal reveal-d2 mx-auto max-w-[520px]" style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, opacity: 0.82, lineHeight: 1.7, margin: "0 auto 48px" }}>
              Desayuno incluido · Cancelación gratuita 72hs antes<br />
              IVA 21% incluido · Mejor precio garantizado
            </p>
            <div className="reveal reveal-d3 flex gap-4 md:gap-5 justify-center flex-wrap">
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 12, padding: "16px 36px" }}>Ver disponibilidad →</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: 12, padding: "16px 36px" }}>Consultar por WhatsApp</a>
            </div>
          </div>
          <div className="reveal-draw-center"><Rule /></div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="reveal px-5 py-16 sm:px-8 md:px-12 lg:px-20 md:py-20" style={{ background: "#091f40" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
          <div>
            <div className="reveal-draw h-px w-10 mb-5" style={{ background: g.gold, opacity: 0.5 }} />
            <h2 className="reveal-blur reveal-d1 mb-8 md:mb-10" style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.ivory, margin: 0 }}>
              Cómo<br /><em style={{ color: g.gold }}>llegar</em>
            </h2>
            <div className="flex flex-col">
              {[
                { label: "Dirección", val: "Alvarado 950, Salta Capital" },
                { label: "Teléfono", val: "(387) 431-2211", href: "tel:+543874312211" },
                { label: "Email", val: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", val: "Consultas directas", href: "https://wa.me/543874312211" },
                { label: "Check-in / out", val: "14:00 hs / 10:00 hs" },
              ].map(item => (
                <div key={item.label} className="reveal reveal-d2 flex gap-6 md:gap-8 py-4 md:py-[18px]" style={{ borderTop: "1px solid rgba(212,169,112,0.1)" }}>
                  <span className="flex-shrink-0 w-[72px] md:w-20 pt-0.5" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, opacity: 0.9 }}>{item.label}</span>
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
          <div className="h-64 sm:h-80 md:h-[440px] overflow-hidden" style={{ opacity: 0.85 }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, display: "block", filter: "invert(1) hue-rotate(180deg) brightness(0.8)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Wilson Hotel" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050f1d", borderTop: "1px solid rgba(212,169,112,0.12)" }}>
        <div className="max-w-[1400px] mx-auto px-5 py-6 sm:px-8 md:px-20 md:py-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div><LogoHorizontal variant="light" size={88} /></div>
          <p className="text-center" style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.65 }}>© {new Date().getFullYear()} Wilson Hotel S.A.</p>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.65 }}>IVA 21% incluido</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a
        href="https://wa.me/543874312211"
        target="_blank"
        rel="noopener noreferrer"
        title="Consultanos por WhatsApp"
        className="fixed bottom-7 right-7 z-[200] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] no-underline hover:scale-110 transition-transform duration-200"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}