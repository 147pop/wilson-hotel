"use client";
import { useState, useEffect, useRef } from "react";
import SocialProof from "@/components/sections/SocialProof";
import Instituciones from "@/components/sections/Instituciones";
import Gallery from "@/components/sections/Gallery";
import SectionDivider from "@/components/ui/SectionDivider";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatARS, type Tarifa, type RoomKey } from "@/lib/tarifas";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Wilson+Hotel+Salta";
const SALTA_TURISMO_URL = "https://saltaciudad.travel/";

const rooms: { key: RoomKey; name: string; occ: string; img: string; desc: string }[] = [
  { key: "SGL", name: "Habitación Simple", occ: "1 persona", img: "/hotel/habitaciones/single-standard/single-standard-03.webp", desc: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado, AC y WiFi." },
  { key: "MAT", name: "Doble Matrimonial", occ: "1–2 personas", img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp", desc: "Ambiente acogedor para parejas. Cama king, baño renovado, TV LED y refrigerador." },
  { key: "TWN", name: "Doble Twin", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-single/doble-single-01.webp", desc: "Dos camas individuales, luminoso y espacioso. Cama extra disponible a pedido." },
  { key: "JRS", name: "Suite Matrimonial", occ: "1–2 + extra", img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", desc: "La más amplia del hotel. Mayor espacio, decoración refinada y vista mejorada." },
  { key: "TPL", name: "Triple", occ: "1–3 personas", img: "/hotel/habitaciones/triple-ms/triple-ms-01.webp", desc: "Tres plazas en ambiente funcional y acogedor. Ideal para familias y grupos pequeños." },
];

const g = {
  blue: "#123E7A", deep: "#0B2C57", sand: "#D8C2A0",
  ivory: "#F5F1EA", graphite: "#444444", gold: "#d4a970",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

const heroCarousel = [
  { src: "/hotel/amenities/fachada/fachada-mejorada-v2.webp", alt: "Fachada del Wilson Hotel" },
  { src: "/hotel/amenities/home/home-01.webp", alt: "Lobby del Wilson Hotel" },
  { src: "/hotel/amenities/desayuno/desayuno-03.webp", alt: "Desayuno buffet" },
  { src: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite Matrimonial" },
];

const desayunoCarousel = [
  { src: "/hotel/amenities/desayuno/desayuno-03.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/desayuno/desayuno-05.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/desayuno/desayuno-07.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/desayuno/desayuno-09.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/desayuno/desayuno-11.webp", alt: "Desayuno buffet" },
];

const salonMedia = [
  { type: "image" as const, src: "/hotel/amenities/salon/salon-01.webp", alt: "Salón de eventos del Wilson Hotel" },
  { type: "image" as const, src: "/hotel/amenities/salon/salon-02.webp", alt: "Salón de eventos del Wilson Hotel" },
  { type: "image" as const, src: "/hotel/amenities/salon/salon-03.webp", alt: "Salón de eventos del Wilson Hotel" },
  { type: "video" as const, src: "/hotel/amenities/salon/salon-video.mp4" },
];

const NAV_ITEMS = ["Servicios", "Habitaciones", "Galería", "Tarifas", "Contacto"];

function PriceTag({ tarifa }: { tarifa: Tarifa | undefined }) {
  if (!tarifa) return null;
  return (
    <div className="flex items-baseline gap-2 mb-2">
      <span style={{ fontFamily: g.fontM, fontSize: 14, color: g.sand, opacity: 0.6, textDecoration: "line-through" }}>
        ${formatARS(tarifa.lista)}
      </span>
      <span style={{ fontFamily: g.fontM, fontSize: 19, color: g.gold, fontWeight: 600 }}>
        ${formatARS(tarifa.oferta)}
      </span>
      <span style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        / noche
      </span>
    </div>
  );
}

export default function Landing({ tarifas, live }: { tarifas: Tarifa[]; live: boolean }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [desayunoIdx, setDesayunoIdx] = useState(0);
  const [salonIdx, setSalonIdx] = useState(0);
  const salonTouchX = useRef(0);
  useScrollReveal();

  const tarifaFor = (key: RoomKey) => tarifas.find(t => t.room === key);
  const sglTarifa = tarifaFor("SGL");

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(p => (p + 1) % heroCarousel.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDesayunoIdx(p => (p + 1) % desayunoCarousel.length), 4000);
    return () => clearInterval(t);
  }, []);

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
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[88px] flex items-center justify-between">
          <div>
            <LogoHorizontal variant="dark" size={84} />
          </div>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex gap-8">
            {NAV_ITEMS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))} className="nav-link-dark">{l}</button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex gap-4 items-center">
            <div className="flex gap-3 items-center" style={{ color: g.graphite, opacity: 0.75 }}>
              <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100079646945697" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-opacity hover:opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
            <a href="tel:+543874312211" style={{ fontFamily: g.fontM, fontSize: 12, color: g.graphite, textDecoration: "none", opacity: 0.82, letterSpacing: "0.05em" }}>(387) 431-2211</a>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "9px 22px" }}>Reservar ahora</a>
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
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))}
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
              className="block w-full btn-gold text-xs py-2.5 text-center mt-2"
            >
              Reservar ahora
            </a>
            <div className="flex gap-4 items-center pt-1" style={{ color: g.graphite, opacity: 0.75 }}>
              <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100079646945697" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
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
              <span style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Hotel 3 Estrellas · Salta</span>
              <div className="flex-1 h-px" style={{ background: g.gold, opacity: 0.3 }} />
            </div>

            <h1 style={{ fontFamily: g.fontG, fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.88, color: g.ivory, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              Hospedate<br />
              <span style={{ color: g.gold, fontStyle: "italic" }}>en el corazón</span><br />
              de Salta
            </h1>

            <p className="max-w-[400px]" style={{ fontFamily: g.fontM, fontSize: 15, color: g.sand, lineHeight: 1.75, margin: "0 0 44px 0", opacity: 0.8 }}>
              Alvarado 950 — a pasos de la Plaza 9 de Julio. Desayuno buffet, más de 40 años de trayectoria y atención personalizada.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold">Reservar ahora</a>
              <a href="https://wa.me/543876363326" target="_blank" rel="noopener noreferrer" className="btn-outline-ivory">WhatsApp</a>
            </div>

            <div style={{ fontFamily: g.fontM, fontSize: 13, marginTop: 18 }}>
              <span style={{ color: g.sand, opacity: 0.75 }}>Booking.com</span>{" "}
              <span style={{ color: g.gold, fontWeight: 600 }}>8,6/10</span>{" "}
              <span style={{ color: g.sand, opacity: 0.6 }}>· 479 reseñas</span>
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
                <div style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: g.sand, opacity: 0.78, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: carousel full height */}
        <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-auto">
          {heroCarousel.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === carouselIdx ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 60%)" }} />
          {/* Dots */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2.5 z-10">
            {heroCarousel.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIdx(i)}
                aria-label={`Imagen ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === carouselIdx ? 20 : 6,
                  height: 6,
                  background: i === carouselIdx ? g.gold : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ background: g.blue }}>
        <div className="pt-8"><SectionDivider light /></div>
        {/* Header */}
        <div className="px-6 py-12 md:px-10 md:py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center gap-3">
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4.5vw, 64px)", color: g.ivory, margin: 0, lineHeight: 0.92, letterSpacing: "-0.01em" }}>
              Servicios
            </h2>
            <span style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: g.gold, opacity: 0.85 }}>
              Incluidos en tu estadía
            </span>
          </div>
        </div>

        {/* Bento: imagen destacada + grilla de amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0.5">
          {/* Desayuno */}
          <div className="reveal-scale relative overflow-hidden h-[260px] sm:h-[380px] lg:h-[520px]">
            {desayunoCarousel.map((item, i) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="img-zoom absolute inset-0 w-full h-full object-cover block transition-opacity duration-1000"
                style={{ opacity: i === desayunoIdx ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 18%, transparent 40%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <div className="w-8 h-px mb-6" style={{ background: g.sand }} />
              <h3 style={{ fontFamily: g.fontG, fontSize: "clamp(28px, 3vw, 44px)", color: g.ivory, margin: "0 0 12px 0", lineHeight: 1 }}>
                Desayuno buffet
              </h3>
              <p style={{ fontFamily: g.fontM, fontSize: 14, color: g.sand, lineHeight: 1.75, margin: 0, opacity: 0.88, maxWidth: "380px" }}>
                Cada mañana, un desayuno completo. Jugos naturales, facturas, tostadas, fiambres, frutas y más.
              </p>
            </div>
          </div>

          {/* Amenities 2×3 */}
          <div
            className="grid grid-cols-2 lg:h-full"
            style={{ gridTemplateRows: "repeat(3, 1fr)" }}
          >
            {[
              {
                name: "WiFi gratuito", desc: "Alta velocidad en todo el hotel",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>,
              },
              {
                name: "Pago con tarjeta", desc: "Visa, MC, Amex aceptadas",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
              },
              {
                name: "Salones de eventos", desc: "Congresos, seminarios y capacitaciones",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              },
              {
                name: "Personal bilingüe", desc: "Atención en español e inglés",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="12" y1="7" x2="12" y2="13"/></svg>,
              },
              {
                name: "Lavandería", desc: "Servicio de tintorería",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><circle cx="6" cy="7" r="1" fill="currentColor" stroke="none"/></svg>,
              },
              {
                name: "Estacionamiento", desc: "Sujeto a disponibilidad",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>,
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} flex flex-col justify-between p-5 md:p-6 lg:p-8`}
                style={{
                  minHeight: 140,
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ color: g.gold, opacity: 0.8 }}>{s.icon}</div>
                <div>
                  <h4 style={{ fontFamily: g.fontG, fontSize: 20, color: g.ivory, margin: "0 0 4px 0" }}>{s.name}</h4>
                  <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, margin: 0, opacity: 0.82, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HABITACIONES ── dark cards grid */}
      <section id="habitaciones" className="px-5 py-20 md:px-10 md:py-24" style={{ background: g.deep }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 md:mb-14">
            <div>
              <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Habitaciones</span>
              <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(36px, 4.5vw, 64px)", color: g.ivory, margin: 0, lineHeight: 0.92 }}>Nuestros espacios</h2>
            </div>
          </div>

          {/* Top 3 rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {rooms.slice(0, 3).map((room, i) => (
              <div key={i} className={`reveal-scale reveal-d${i + 1} relative h-[320px] sm:h-[360px] lg:h-[380px] overflow-hidden`}>
                <img src={room.img} alt={room.name} loading="lazy" className="img-zoom w-full h-full object-cover block" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="block mb-1.5" style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.6, margin: "0 0 10px 0", opacity: 0.85 }}>{room.desc}</p>
                    <PriceTag tarifa={tarifaFor(room.key)} />
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold flex-shrink-0 whitespace-nowrap" style={{ fontSize: 9, padding: "10px 20px" }}>Reservar ahora</a>
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
                    <span className="block mb-1.5" style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>{room.occ}</span>
                    <h3 style={{ fontFamily: g.fontG, fontSize: 24, color: g.ivory, margin: "0 0 8px 0" }}>{room.name}</h3>
                    <p className="hidden sm:block" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, lineHeight: 1.6, margin: "0 0 10px 0", opacity: 0.85 }}>{room.desc}</p>
                    <PriceTag tarifa={tarifaFor(room.key)} />
                  </div>
                  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold flex-shrink-0 whitespace-nowrap" style={{ fontSize: 9, padding: "10px 20px" }}>Reservar ahora</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <div id="galeria">
        <Gallery variant="dark" />
      </div>

      {/* ── TARIFAS ── ivory section, 3 blocks */}
      <section id="tarifas" className="px-5 py-16 md:px-10 md:py-20" style={{ background: g.ivory }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal mb-10 md:mb-12">
            <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Planes tarifarios</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: 0 }}>Elegí tu tarifa</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Alojamiento y Desayuno", tag: "Reembolsable", desc: "Cancelación gratuita 72hs antes. Garantía con tarjeta de crédito. Pago en el hotel.", border: g.sand, price: sglTarifa?.lista },
              { name: "Último Minuto", tag: "Oferta — No reembolsable", desc: "15% de descuento sobre tarifa base. Pago anticipado con tarjeta de crédito. Mejor precio garantizado.", border: g.gold, featured: true, price: sglTarifa?.oferta, priceTachado: sglTarifa?.lista },
              { name: "Alojamiento y Desayuno No Reembolsable", tag: "10% de descuento", desc: "Precio especial con pago anticipado total. Sin posibilidad de reembolso.", border: g.sand, price: sglTarifa?.noReemb },
            ].map((t, i) => (
              <div key={i}
                className={`reveal reveal-d${i + 1} relative flex flex-col h-full p-7 sm:p-8 transition-shadow hover:shadow-lg`}
                style={{ border: `2px solid ${t.featured ? g.gold : g.sand}`, background: t.featured ? "rgba(212,169,112,0.08)" : "white" }}>
                {t.featured && <div className="absolute -top-3 left-6" style={{ background: g.gold, padding: "4px 16px", fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: g.deep }}>Recomendada</div>}
                <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-muted)" }}>{t.tag}</span>
                <h3 style={{ fontFamily: g.fontG, fontSize: 26, color: g.deep, margin: "0 0 14px 0" }}>{t.name}</h3>
                <p style={{ fontFamily: g.fontM, fontSize: 14, color: g.graphite, lineHeight: 1.7, margin: "0 0 16px 0", opacity: 0.88 }}>{t.desc}</p>
                {t.price != null && (
                  <div className="flex items-baseline gap-2 mb-5">
                    {t.priceTachado != null && (
                      <span style={{ fontFamily: g.fontM, fontSize: 15, color: g.graphite, opacity: 0.45, textDecoration: "line-through" }}>${formatARS(t.priceTachado)}</span>
                    )}
                    <span style={{ fontFamily: g.fontM, fontSize: 22, color: t.featured ? g.gold : g.deep, fontWeight: 600 }}>Desde ${formatARS(t.price)}</span>
                    <span style={{ fontFamily: g.fontM, fontSize: 13, color: g.graphite, opacity: 0.6 }}>/ noche</span>
                  </div>
                )}
                <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold inline-block mt-auto self-start" style={{ fontSize: 12, padding: "10px 24px" }}>Reservar ahora</a>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.graphite, opacity: 0.6, marginTop: 24 }}>
            Precios por noche en Habitación Simple, en pesos argentinos, IVA incluido. Sujetos a disponibilidad.
            {!live && " Consultá el precio final en el motor de reservas."}
          </p>
        </div>
      </section>

      {/* ── SALÓN DE EVENTOS ── */}
      <section className="px-5 py-16 md:px-10 md:py-20" style={{ background: g.sand }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div
            className="relative h-[280px] md:h-[420px] overflow-hidden order-2 md:order-1"
            onTouchStart={(e) => { salonTouchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - salonTouchX.current;
              if (Math.abs(dx) < 40) return;
              setSalonIdx(p => (p + (dx < 0 ? 1 : -1) + salonMedia.length) % salonMedia.length);
            }}
          >
            {salonMedia.map((item, i) =>
              item.type === "video" ? (
                <video
                  key={item.src}
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: i === salonIdx ? 1 : 0 }}
                />
              ) : (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: i === salonIdx ? 1 : 0 }}
                />
              )
            )}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2.5 z-10">
              {salonMedia.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSalonIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === salonIdx ? 20 : 6,
                    height: 6,
                    background: i === salonIdx ? g.gold : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Eventos y reuniones</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: "0 0 20px 0" }}>Salón de eventos</h2>
            <p style={{ fontFamily: g.fontM, fontSize: 15, color: g.graphite, lineHeight: 1.8, margin: "0 0 32px 0", opacity: 0.9 }}>
              Espacio equipado para congresos, seminarios y capacitaciones en pleno centro de Salta. Coordinamos catering, disposición de sala y equipamiento audiovisual a medida de tu evento.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:reservas@wilsonhotel.com.ar?subject=Consulta%20sal%C3%B3n%20de%20eventos&body=Hola%2C%20quisiera%20consultar%20disponibilidad%20del%20sal%C3%B3n%20de%20eventos.%0A%0AFecha%20estimada%3A%20%0ACantidad%20de%20personas%3A%20%0ATipo%20de%20evento%3A%20"
                className="btn-navy"
              >
                Consultar por email
              </a>
              <a href="https://wa.me/543876363326?text=Hola%2C%20quisiera%20consultar%20por%20el%20sal%C3%B3n%20de%20eventos" target="_blank" rel="noopener noreferrer" className="btn-outline-deep">
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SocialProof variant="light" />
      <Instituciones />

      {/* ── BOOKING CTA ── navy, para distinguirse del sand/ivory de arriba y abajo */}
      <section className="reveal px-5 py-16 md:px-10 md:py-24" style={{ background: g.deep }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <span className="reveal reveal-d1 block mb-4" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, opacity: 0.85 }}>Mejor precio garantizado</span>
            <h2 className="reveal reveal-d2" style={{ fontFamily: g.fontG, fontSize: "clamp(40px, 6.5vw, 88px)", color: g.ivory, margin: "0 0 20px 0", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              Reservá<br />directamente
            </h2>
            <p className="reveal reveal-d3" style={{ fontFamily: g.fontM, fontSize: 15, color: g.sand, lineHeight: 1.7, margin: 0, opacity: 0.88 }}>
              Reservando directo con nosotros obtenés el mejor precio disponible. Cancelación gratuita hasta 72hs antes. IVA incluido.
            </p>
          </div>
          <div className="reveal reveal-d4 flex flex-col gap-4">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold text-center text-xs py-4 md:py-[18px] px-8 md:px-10">
              Reservar ahora
            </a>
            <a href="https://wa.me/543876363326" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 px-8 transition-opacity hover:opacity-90"
              style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: g.deep, textDecoration: "none", background: g.gold, borderRadius: 2 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={g.deep}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Consultar por WhatsApp
            </a>
            <a href="tel:+543874312211" className="text-center" style={{ fontFamily: g.fontM, fontSize: 13, color: g.sand, textDecoration: "none", opacity: 0.82, letterSpacing: "0.05em" }}>
              (387) 431-2211
            </a>
          </div>
        </div>
      </section>

      {/* ── QUÉ HACER EN SALTA ── fondo distinto al del CTA de arriba */}
      <section className="reveal px-5 py-16 md:px-10 md:py-20" style={{ background: g.blue }}>
        <div className="max-w-[640px] mx-auto text-center">
          <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold }}>Más allá del hotel</span>
          <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.ivory, margin: "0 0 20px 0" }}>Qué hacer en Salta</h2>
          <p style={{ fontFamily: g.fontM, fontSize: 15, color: g.sand, lineHeight: 1.8, margin: "0 0 32px 0", opacity: 0.85 }}>
            Desde el Wilson Hotel estás a pasos de la Plaza 9 de Julio, el Cabildo y los circuitos gastronómicos del centro histórico. El Ente de Turismo de la Ciudad de Salta reúne toda la agenda de paseos, excursiones y eventos culturales para armar tu estadía.
          </p>
          <a href={SALTA_TURISMO_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">Ver actividades en Salta</a>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="reveal px-5 py-16 md:px-10 md:py-20" style={{ background: g.ivory }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <span className="block mb-2.5" style={{ fontFamily: g.fontM, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Cómo llegar</span>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 3.5vw, 52px)", color: g.deep, margin: "0 0 32px 0" }}>Ubicación</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
              {[
                { label: "Dirección", val: "Alvarado 950, Salta Capital" },
                { label: "Teléfono", val: "(387) 431-2211", href: "tel:+543874312211" },
                { label: "Email", val: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
                { label: "WhatsApp", val: "Consultas directas", href: "https://wa.me/543876363326" },
                { label: "Check-in", val: "14:00 hs" },
                { label: "Check-out", val: "10:00 hs" },
              ].map(item => (
                <div key={item.label} className="py-4" style={{ borderBottom: `1px solid ${g.sand}` }}>
                  <span className="block mb-1" style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-muted)" }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: g.fontM, fontSize: 15, color: g.deep, textDecoration: "none" }}>{item.val}</a>
                  ) : (
                    <span style={{ fontFamily: g.fontM, fontSize: 15, color: g.graphite }}>{item.val}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Redes sociales — bloque propio, más visible */}
            <div className="mt-8">
              <span className="block mb-3" style={{ fontFamily: g.fontM, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-muted)" }}>Seguinos</span>
              <div className="flex flex-wrap gap-5">
                <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
                  style={{ fontFamily: g.fontM, fontSize: 15, color: g.deep, textDecoration: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  @wilsonhotel.salta
                </a>
                <a href="https://www.facebook.com/profile.php?id=100079646945697" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
                  style={{ fontFamily: g.fontM, fontSize: 15, color: g.deep, textDecoration: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Wilson Hotel
                </a>
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
                  style={{ fontFamily: g.fontM, fontSize: 15, color: g.deep, textDecoration: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Dejá tu reseña
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-72 md:h-[380px] overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
                width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Wilson Hotel ubicación" />
            </div>
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-deep text-center">
              Dejá tu reseña en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: g.deep }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${g.deep}, ${g.gold}, ${g.deep})` }} />
        <div className="max-w-[1400px] mx-auto px-5 py-6 md:px-10 md:py-9 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <LogoHorizontal variant="light" size={88} />
          </div>
          <p style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, opacity: 0.72 }}>© {new Date().getFullYear()} Wilson Hotel S.A.</p>
          <p className="text-center md:text-right" style={{ fontFamily: g.fontM, fontSize: 12, color: g.sand, opacity: 0.72 }}>IVA 21% incluido · reservas@wilsonhotel.com.ar</p>
        </div>
        <div className="max-w-[1400px] mx-auto px-5 pb-7 md:px-10 flex flex-wrap justify-center gap-x-10 gap-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
          <a href="https://instagram.com/wilsonhotel.salta" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors duration-200"
            style={{ fontFamily: g.fontM, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: g.gold, opacity: 0.85, textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @wilsonhotel.salta
          </a>
          <a href="https://www.facebook.com/profile.php?id=100079646945697" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors duration-200"
            style={{ fontFamily: g.fontM, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: g.gold, opacity: 0.85, textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Wilson Hotel
          </a>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors duration-200"
            style={{ fontFamily: g.fontM, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: g.gold, opacity: 0.85, textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23zM5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </a>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a
        href="https://wa.me/543876363326"
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
