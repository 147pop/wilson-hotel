"use client";
import { useState, useEffect } from "react";
import SocialProof from "@/components/sections/SocialProof";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

const rooms = [
  { name: "Habitación Simple", occ: "1 persona", img: "/hotel/habitaciones/single-standard/single-standard-03.webp", desc: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado, AC y WiFi." },
  { name: "Doble Matrimonial", occ: "1–2 personas", img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp", desc: "Ambiente acogedor para parejas. Cama king, baño renovado, TV LED y refrigerador." },
  { name: "Doble Twin", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-single/doble-single-01.webp", desc: "Dos camas individuales, luminoso y espacioso. Cama extra disponible a pedido." },
  { name: "Suite Matrimonial", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", desc: "La más amplia del hotel. Mayor espacio, decoración refinada y vista mejorada." },
  { name: "Triple", occ: "1–3 personas", img: "/hotel/habitaciones/triple-ms/triple-ms-01.webp", desc: "Tres plazas en ambiente funcional y acogedor. Ideal para familias y grupos pequeños." },
];

const g = {
  blue: "#123E7A", deep: "#0B2C57", sand: "#D8C2A0",
  ivory: "#F5F1EA", graphite: "#444444", gold: "#d4a970",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

export default function VarianteB() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main style={{ color: g.deep, overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: g.ivory,
        borderBottom: `2px solid ${scrollY > 20 ? g.blue : g.sand}`,
        transition: "border-color 0.4s ease",
      }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">
          <div>
            <LogoHorizontal variant="dark" size={56} />
          </div>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex gap-8">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="nav-link-dark">{l}</button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex gap-3 items-center">
            <a href="tel:+543874312211" style={{ fontFamily: g.fontM, fontSize: 10, color: g.graphite, textDecoration: "none", opacity: 0.82, letterSpacing: "0.05em" }}>(387) 431-2211</a>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ padding: "9px 22px" }}>Reservar</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-wilson-blue-deep"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t px-5 py-4 space-y-3" style={{ background: g.ivory, borderColor: g.sand }}>
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left font-montserrat text-sm hover:text-wilson-gold transition-colors py-1"
                style={{ color: g.deep }}
              >
                {item}
              </button>
            ))}
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full btn-navy text-xs py-2.5 text-center mt-2"
            >
              Reservar ahora
            </a>
          </div>
        )}

        <div style={{ height: 3, background: `linear-gradient(90deg, ${g.deep} 0%, ${g.gold} 50%, ${g.deep} 100%)` }} />
      </header>

      {/* ── HERO ── bold split: navy left, photo right → stacks on mobile */}
      <section className="pt-[71px] min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: dark navy */}
        <div className="relative overflow-hidden flex flex-col justify-between px-6 py-16 sm:px-10 md:px-12 lg:px-16" style={{ background: g.deep }}>
          <div style={{ position: "absolute", top: "-5%", left: "-8%", fontFamily: g.fontG, fontSize: "55vw", color: "white", opacity: 0.02, lineHeight: 1, userSelect: "none", pointerEvents: "none", fontWeight: 700 }}>W</div>

          <div className="fade-up flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Hotel 3 Estrellas · Salta</span>
              <div className="flex-1 h-px" style={{ background: g.gold, opacity: 0.3 }} />
            </div>

            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.88, color: g.ivory, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              Hospedate<br />
              <span style={{ color: g.gold, fontStyle: "italic" }}>en el corazón</span><br />
              de Salta
            </h1>

            <p className="max-w-[400px]" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.75, margin: "0 0 44px 0", opacity: 0.8 }}>
              Alvarado 950 — a pasos de la Plaza 9 de Julio. Desayuno buffet incluido, más de 40 años de trayectoria y atención personalizada.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold">Reservar ahora</a>
              <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer" className="btn-outline-ivory">WhatsApp</a>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 mt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { num: "40+", label: "Años de trayectoria" },
              { num: "5", label: "Tipos de habitación" },
              { num: "★★★", label: "Hotel categoría" },
            ].map((s, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} p-4 sm:p-5 md:px-6 md:py-5`} style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ fontFamily: g.fontM, fontSize: 26, color: g.gold, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: g.sand, opacity: 0.78, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: photo full height */}
        <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-auto">
          <img
            src="/hotel/amenities/home/home-01.webp"
            alt="Wilson Hotel habitación"
            className="img-zoom w-full h-full object-cover block"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 60%)" }} />
          <div className="absolute top-6 right-4 sm:top-10 sm:right-8" style={{ background: g.gold, padding: "12px 20px" }}>
            <span className="block" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>Desayuno</span>
            <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>incluido</span>
          </div>
        </div>
      </section>

      <SocialProof variant="sand" />

      {/* ── HABITACIONES ── dark cards grid */}
      <section id="habitaciones" className="px-5 py-20 md:px-10 md:py-24" style={{ background: g.blue }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 md:mb-14">
            <div>
              <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Habitaciones</span>
              <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4.5vw, 64px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>Nuestros espacios</h2>
            </div>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold flex-shrink-0">Ver disponibilidad</a>
          </div>

          {/* Top 3 rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {rooms.slice(0, 3).map((room, i) => (
              <div key={i} className={`reveal-scale reveal-d${i + 1} relative h-[320px] sm:h-[360px] lg:h-[380px] overflow-hidden`}>
                <img src={room.img} alt={room.name} loading="lazy" className="img-zoom w-full h-full object-cover block" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="block mb-1.5" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{room.desc}</p>
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold flex-shrink-0 whitespace-nowrap" style={{ fontSize: 9, padding: "10px 20px" }}>Reservar</a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 2 rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mt-0.5">
            {rooms.slice(3).map((room, i) => (
              <div key={i} className={`reveal-scale reveal-d${i + 1} relative h-[280px] sm:h-[300px] overflow-hidden`}>
                <img src={room.img} alt={room.name} loading="lazy" className="img-zoom w-full h-full object-cover block" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="block mb-1.5" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{room.desc}</p>
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-gold flex-shrink-0 whitespace-nowrap" style={{ fontSize: 9, padding: "10px 20px" }}>Reservar</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFAS ── ivory section, 3 blocks */}
      <section className="px-5 py-16 md:px-10 md:py-20" style={{ background: g.ivory }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal mb-10 md:mb-12">
            <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Planes tarifarios</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: 0 }}>Elegí tu tarifa</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Alojamiento y Desayuno", tag: "Reembolsable", desc: "Cancelación gratuita 72hs antes. Garantía con tarjeta de crédito. Pago en el hotel.", border: g.sand },
              { name: "Último Minuto", tag: "Oferta — No reembolsable", desc: "15% de descuento sobre tarifa base. Pago anticipado con TC. Mejor precio garantizado.", border: g.gold, featured: true },
              { name: "No Reembolsable", tag: "10% de descuento", desc: "Precio especial con pago anticipado total. Sin posibilidad de reembolso.", border: g.sand },
            ].map((t, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} relative p-7 sm:p-8`} style={{ border: `2px solid ${t.featured ? g.gold : g.sand}`, background: t.featured ? "rgba(212,169,112,0.08)" : "white" }}>
                {t.featured && <div className="absolute -top-3 left-6" style={{ background: g.gold, padding: "4px 16px", fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>Recomendada</div>}
                <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-muted)" }}>{t.tag}</span>
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
          { img: "/hotel/amenities/desayuno/desayuno-03.webp", title: "Desayuno buffet incluido", desc: "Cada mañana, un desayuno completo te espera. Jugos naturales, facturas, tostadas, fiambres, frutas y más. Incluido en todas las tarifas sin excepción.", reverse: false },
          { img: "/hotel/amenities/fachada/fachada-01.webp", title: "Ubicación inmejorable", desc: "Alvarado 950, a dos cuadras de la Plaza 9 de Julio. El centro histórico de Salta a tu alcance: catedrales, museos, gastronomía y cultura a pasos del hotel.", reverse: true },
        ].map((s, i) => (
          <div key={i} className={`${i === 0 ? "reveal-slide-right" : "reveal-slide-left"} grid grid-cols-1 md:grid-cols-2`} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            {s.reverse ? (
              <>
                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-16 md:py-[72px] order-2 md:order-1">
                  <div className="reveal-draw w-10 h-0.5 mb-7" style={{ background: g.gold }} />
                  <h3 style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 3.5vw, 48px)", color: g.ivory, margin: "0 0 20px 0" }}>{s.title}</h3>
                  <p className="max-w-[440px]" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.8, margin: 0, opacity: 0.8 }}>{s.desc}</p>
                </div>
                <div className="h-[260px] sm:h-[300px] md:h-[360px] overflow-hidden order-1 md:order-2">
                  <img src={s.img} alt={s.title} loading="lazy" className="img-zoom w-full h-full object-cover block" />
                </div>
              </>
            ) : (
              <>
                <div className="h-[260px] sm:h-[300px] md:h-[360px] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="img-zoom w-full h-full object-cover block" />
                </div>
                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-16 md:py-[72px]">
                  <div className="reveal-draw w-10 h-0.5 mb-7" style={{ background: g.gold }} />
                  <h3 style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 3.5vw, 48px)", color: g.ivory, margin: "0 0 20px 0" }}>{s.title}</h3>
                  <p className="max-w-[440px]" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.8, margin: 0, opacity: 0.8 }}>{s.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Services mini-grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { name: "WiFi gratuito", desc: "Alta velocidad en todo el hotel" },
            { name: "Salones eventos", desc: "Para grupos y reuniones" },
            { name: "Pago con tarjeta", desc: "Visa, MC, Amex aceptadas" },
            { name: "40+ años", desc: "Atención personalizada siempre" },
          ].map((s, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} p-6 sm:p-7 md:p-8`} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div className="w-7 h-px mb-5" style={{ background: g.gold, opacity: 0.7 }} />
              <h4 style={{ fontFamily: g.fontG, fontSize: 20, color: g.ivory, margin: "0 0 6px 0" }}>{s.name}</h4>
              <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, margin: 0, opacity: 0.82, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section id="galería" style={{ background: g.sand }}>
        <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gridAutoRows: "clamp(180px, 25vw, 240px)" }}>
          {[
            { img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite" },
            { img: "/hotel/habitaciones/doble-suite-sillas/doble-suite-sillas-01.webp", alt: "Suite con living" },
            { img: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno" },
            { img: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Twin" },
            { img: "/hotel/amenities/home/home-01.webp", alt: "Lobby" },
            { img: "/hotel/habitaciones/triple-ms/triple-ms-01.webp", alt: "Triple" },
          ].map((p, i) => (
            <div key={i} className={`reveal-scale reveal-d${i + 1} overflow-hidden`}>
              <img src={p.img} alt={p.alt} loading="lazy" className="img-zoom w-full h-full object-cover block" />
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-5 py-4 md:px-10" style={{ background: g.deep }}>
          <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.sand, opacity: 0.78 }}>Galería de imágenes</span>
          <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold, textDecoration: "none" }}>@wilsonhotel.salta →</a>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="reveal px-5 py-16 md:px-10 md:py-24" style={{ background: g.sand }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <span className="reveal reveal-d1 block mb-4" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: g.deep, opacity: 0.7 }}>Mejor precio garantizado</span>
            <h2 className="reveal reveal-d2" style={{ fontFamily: g.fontG, fontSize: "clamp(40px, 6.5vw, 88px)", color: g.deep, margin: "0 0 20px 0", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              Reservá<br />directamente
            </h2>
            <p className="reveal reveal-d3" style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
              Reservando directo con nosotros obtenés el mejor precio disponible. Cancelación gratuita hasta 72hs antes. IVA incluido.
            </p>
          </div>
          <div className="reveal reveal-d4 flex flex-col gap-4">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy text-center text-xs py-4 md:py-[18px] px-8 md:px-10">
              Ver disponibilidad online →
            </a>
            <a href="https://wa.me/543874312211" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 px-8 transition-opacity"
              style={{ fontFamily: g.fontM, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: g.deep, textDecoration: "none", border: `1px solid rgba(11,44,87,0.3)`, opacity: 0.88 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4a970"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Consultar por WhatsApp
            </a>
            <a href="tel:+543874312211" className="text-center" style={{ fontFamily: g.fontM, fontSize: 11, color: g.deep, textDecoration: "none", opacity: 0.78, letterSpacing: "0.05em" }}>
              (387) 431-2211
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="reveal px-5 py-16 md:px-10 md:py-20" style={{ background: g.ivory }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Cómo llegar</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: "0 0 32px 0" }}>Ubicación</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
              {[
                { label: "Dirección", val: "Alvarado 950, Salta Capital" },
                { label: "Teléfono", val: "(387) 431-2211", href: "tel:+543874312211" },
                { label: "Email", val: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", val: "Consultas directas", href: "https://wa.me/543874312211" },
                { label: "Check-in", val: "14:00 hs" },
                { label: "Check-out", val: "10:00 hs" },
              ].map(item => (
                <div key={item.label} className="py-4" style={{ borderBottom: `1px solid ${g.sand}` }}>
                  <span className="block mb-1" style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-muted)" }}>{item.label}</span>
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
          <div className="h-72 md:h-[420px] overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Wilson Hotel ubicación" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: g.deep }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${g.deep}, ${g.gold}, ${g.deep})` }} />
        <div className="max-w-[1400px] mx-auto px-5 py-6 md:px-10 md:py-9 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <LogoHorizontal variant="light" size={50} />
          </div>
          <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.72 }}>© {new Date().getFullYear()} Wilson Hotel S.A.</p>
          <p className="text-center md:text-right" style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.72 }}>IVA 21% incluido · reservas@wilsonhotel.com.ar</p>
        </div>
      </footer>
    </main>
  );
}