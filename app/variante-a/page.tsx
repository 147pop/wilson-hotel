"use client";
import { useState, useEffect, useCallback } from "react";
import SocialProof from "@/components/sections/SocialProof";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import LogoIsotipo from "@/components/brand/LogoIsotipo";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

const heroCarouselImages = [
  { src: "/hotel/amenities/fachada/fachada-mejorada-v2.webp", alt: "Fachada del Wilson Hotel" },
  { src: "/hotel/amenities/home/home-01.webp", alt: "Lobby panorámico del Wilson Hotel" },
  { src: "/hotel/amenities/desayuno/desayuno-03.webp", alt: "Área de desayuno buffet" },
  { src: "/hotel/amenities/desayuno/desayuno-04.webp", alt: "Buffet de desayuno" },
];

const rooms = [
  {
    name: "Habitación Simple",
    occ: "1 persona",
    img: "/hotel/habitaciones/single-standard/single-standard-03.webp",
    desc: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado completo, aire acondicionado y WiFi de alta velocidad.",
  },
  {
    name: "Doble Matrimonial",
    occ: "1–2 personas",
    img: "/hotel/habitaciones/doble-standard/doble-standard-01.webp",
    desc: "Ambiente íntimo y acogedor para parejas. Cama king, baño renovado, televisor LED y atención personalizada.",
  },
  {
    name: "Doble Twin",
    occ: "1–2 personas + cama extra",
    img: "/hotel/habitaciones/doble-single/doble-single-01.webp",
    desc: "Dos camas individuales para viajeros independientes. Luminoso, espacioso y con posibilidad de cama extra.",
  },
  {
    name: "Suite Matrimonial",
    occ: "1–2 personas + cama extra",
    img: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp",
    desc: "La habitación más amplia y equipada del hotel. Mayor espacio, decoración cuidada y vista mejorada.",
  },
  {
    name: "Triple",
    occ: "1–3 personas",
    img: "/hotel/habitaciones/triple-ms/triple-ms-01.webp",
    desc: "Tres plazas cómodas en un ambiente familiar y funcional. Ideal para grupos y familias en Salta.",
  },
];

const services = [
  { name: "Desayuno buffet", desc: "Incluido en todas las tarifas. Variedad de opciones cada mañana." },
  { name: "WiFi de alta velocidad", desc: "Conectividad en habitaciones y áreas comunes del hotel." },
  { name: "Salones de eventos", desc: "Espacios para reuniones, conferencias y celebraciones." },
  { name: "Ubicación céntrica", desc: "A pasos de la Plaza 9 de Julio y el casco histórico." },
  { name: "Más de 40 años", desc: "Cuatro décadas recibiendo huéspedes con dedicación." },
  { name: "Cuotas y Mercado Pago", desc: "Hasta 3 cuotas sin interés. Visa, Mastercard, Amex y Mercado Pago." },
];

const tariffs = [
  {
    name: "Alojamiento y Desayuno",
    tag: "Reembolsable · Pago en hotel",
    desc: "Cancelación gratuita hasta 72hs antes del arribo. Garantía con tarjeta de crédito.",
    featured: false,
  },
  {
    name: "Último Minuto",
    tag: "Oferta — No reembolsable",
    desc: "15% de descuento sobre la tarifa base. Pago anticipado total con tarjeta de crédito.",
    featured: true,
  },
  {
    name: "No Reembolsable",
    tag: "10% descuento · Sin reembolso",
    desc: "Precio especial con pago anticipado. Sin posibilidad de reembolso una vez confirmada.",
    featured: false,
  },
];

const galleryPhotos = [
  { img: "/hotel/amenities/home/home-01.webp", alt: "Lobby del hotel", span: "col-span-2 row-span-2" },
  { img: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Habitación twin", span: "" },
  { img: "/hotel/habitaciones/doble-suite-sillas/doble-suite-sillas-01.webp", alt: "Suite con living", span: "" },
  { img: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno buffet", span: "" },
  { img: "/hotel/amenities/salon/salon-01.webp", alt: "Salón de eventos", span: "" },
];

const contactInfo = [
  { label: "Dirección", text: "Alvarado 950, Salta Capital" },
  { label: "Teléfono", text: "(+54 387) 4-312211", href: "tel:+543874312211" },
  { label: "Email", text: "info@wilsonhotel.com.ar", href: "mailto:info@wilsonhotel.com.ar" },
  { label: "WhatsApp", text: "Consultas directas", href: "https://wa.me/543874312211" },
  { label: "Instagram", text: "@wilsonhotel.salta", href: "https://instagram.com/wilsonhotel.salta" },
];

export default function VarianteA() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % heroCarouselImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="bg-wilson-ivory text-wilson-blue-deep overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-wilson-ivory/97 backdrop-blur-md border-b border-wilson-sand"
            : "bg-transparent"
        }`}
      >
        {/* Gold top accent */}
        <div
          className="h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #d4a970, transparent)" }}
        />
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
          {/* Left nav (desktop) */}
          <nav className="hidden lg:flex gap-9">
            {["Habitaciones", "Servicios"].map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="nav-link-dark"
              >
                {l}
              </button>
            ))}
          </nav>

          {/* Center logo */}
          <div className="text-center">
            <LogoHorizontal variant="dark" size={60} />
          </div>

          {/* Right nav (desktop) */}
          <nav className="hidden lg:flex gap-9 items-center">
            {["Galería", "Contacto"].map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase().replace("í", "i"))}
                className="nav-link-dark"
              >
                {l}
              </button>
            ))}
            <a
              href="tel:+543874312211"
              className="font-montserrat text-xs tracking-wider text-wilson-blue-deep no-underline"
            >
              (387) 431-2211
            </a>
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy py-2.5 px-6"
            >
              Reservar
            </a>
          </nav>

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
          <div className="lg:hidden bg-wilson-ivory border-t border-wilson-sand px-4 py-4 space-y-3">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace("í", "i"))}
                className="block w-full text-left font-montserrat text-sm text-wilson-blue-deep hover:text-wilson-gold transition-colors py-1"
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
      </header>

      {/* ── HERO ── editorial, ivory bg, clean asymmetric */}
      <section className="min-h-screen pt-[72px] relative flex items-center">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">

          {/* LEFT: text */}
          <div className="fade-up order-2 md:order-1">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="h-px w-12 bg-wilson-gold" />
              <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--blue-muted)]">
                Alvarado 950 · Salta, Argentina
              </span>
            </div>

            <h1
              className="font-garamond text-wilson-blue-deep mb-1 leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)" }}
            >
              Wilson
            </h1>
            <h1
              className="font-garamond text-[var(--blue-muted)] italic mb-8 md:mb-9 leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)" }}
            >
              Hotel
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-wilson-gold text-xl tracking-widest">★ ★ ★</span>
              <div className="h-px w-20 bg-wilson-sand" />
            </div>

            <p className="font-garamond text-lg md:text-xl italic text-wilson-blue-deep/80 leading-relaxed mb-10 md:mb-12 max-w-md" style={{ textWrap: "pretty" } as React.CSSProperties}>
              Hospedate en el corazón de Salta. Tradición, confort y calidez en cada estadía desde 1980.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-navy">
                Reservar ahora
              </a>
              <a
                href="https://wa.me/543874312211"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex gap-5 flex-wrap mt-5">
              <span className="font-montserrat text-xs text-wilson-graphite/85 flex items-center gap-1.5">
                <span className="text-wilson-gold">✓</span> Mejor precio al reservar directo
              </span>
              <span className="font-montserrat text-xs text-wilson-graphite/85 flex items-center gap-1.5">
                <span className="text-wilson-gold">✓</span> Mercado Pago · Cuotas sin interés
              </span>
            </div>
          </div>

          {/* RIGHT: full carousel */}
          <div className="fade-up-1 relative order-1 md:order-2 h-[360px] md:h-[540px] lg:h-[580px] overflow-hidden">
            {heroCarouselImages.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]"
                style={{ opacity: i === carouselIdx ? 1 : 0 }}
                loading={i === 0 ? undefined : "lazy"}
              />
            ))}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 65%, rgba(11,44,87,0.15))" }}
            />
            {/* Progress dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
              {heroCarouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIdx(i)}
                  className="w-2 h-2 transition-all duration-300"
                  style={{
                    background: i === carouselIdx ? "#d4a970" : "rgba(255,255,255,0.5)",
                    transform: i === carouselIdx ? "scale(1.3)" : "scale(1)",
                  }}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-wilson-blue-deep">
            Descubrí
          </span>
          <div className="w-px h-12 bg-wilson-gold" />
        </div>
      </section>

      {/* ── PAYMENT STRIPE ── */}
      <section className="bg-wilson-blue-deep py-3 px-4 md:px-8 text-center border-b border-white/5">
        <p className="font-montserrat text-xs tracking-[0.14em] text-wilson-sand/80 uppercase">
          Mercado Pago &nbsp;·&nbsp; Hasta 3 cuotas sin interés &nbsp;·&nbsp; Visa &nbsp;·&nbsp; Mastercard &nbsp;·&nbsp; American Express &nbsp;·&nbsp; Pago en destino
        </p>
      </section>

      {/* ── QUOTE BAND ── */}
      <section className="bg-wilson-blue-deep py-16 md:py-20 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-5 justify-center mb-7">
            <div className="h-px flex-1 max-w-[80px] bg-wilson-gold/40" />
            <span className="text-wilson-gold text-lg">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-wilson-gold/40" />
          </div>
          <p
            className="font-garamond italic text-wilson-ivory leading-[1.45] tracking-[0.01em]"
            style={{ fontSize: "clamp(1.375rem, 3.5vw, 2.5rem)", textWrap: "balance" } as React.CSSProperties}
          >
            &ldquo;Más de 40 años recibiendo huéspedes con dedicación.
            <br />
            Calidad, comodidad y calidez en cada estadía.&rdquo;
          </p>
          <div className="flex items-center gap-5 justify-center mt-7">
            <div className="h-px flex-1 max-w-[80px] bg-wilson-gold/40" />
            <span className="text-wilson-gold text-lg">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-wilson-gold/40" />
          </div>
        </div>
      </section>

      <SocialProof variant="light" />

      {/* ── HABITACIONES ── editorial alternating layout */}
      <section id="habitaciones" className="py-20 md:py-24 px-4 md:px-8 bg-wilson-ivory">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-end gap-6 mb-16 md:mb-20">
            <div>
              <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--blue-muted)] block mb-2.5">
                Nuestras habitaciones
              </span>
              <h2
                className="font-garamond text-wilson-blue-deep leading-[0.92] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", textWrap: "balance" } as React.CSSProperties}
              >
                Espacios<br />para el descanso
              </h2>
            </div>
            <div className="flex-1 h-px bg-wilson-sand mb-2 hidden md:block" />
          </div>

          {/* Room entries */}
          {rooms.map((room, i) => (
            <div
              key={room.name}
              className={`border-t border-wilson-sand py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-0 items-center ${
                i % 2 !== 0 ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden h-64 md:h-80 ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover img-zoom"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className={`py-6 md:py-0 md:px-10 lg:px-14 flex flex-col justify-center ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
                <span className="font-montserrat text-xs tracking-[0.25em] uppercase text-[var(--blue-muted)] mb-2.5 block">
                  {room.occ}
                </span>
                <h3 className="font-garamond text-2xl md:text-3xl lg:text-4xl text-wilson-blue-deep mb-4">
                  {room.name}
                </h3>
                <p className="font-montserrat text-sm text-wilson-graphite leading-7 mb-6 max-w-sm">
                  {room.desc}
                </p>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="h-px w-7 bg-wilson-gold" />
                  <span className="font-montserrat text-xs tracking-[0.2em] uppercase text-wilson-blue-deep/75">
                    Desayuno incluido
                  </span>
                </div>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy self-start text-xs py-2.5 px-6"
                >
                  Reservar
                </a>
              </div>
            </div>
          ))}
          <div className="border-t border-wilson-sand" />
        </div>
      </section>

      {/* ── TARIFAS ── */}
      <section id="tarifas" className="bg-wilson-blue-deep">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {tariffs.map((t, i) => (
            <div
              key={i}
              className={`px-6 md:px-10 py-14 ${
                i < 2 ? "lg:border-r lg:border-white/[0.08]" : ""
              } ${
                t.featured
                  ? "bg-wilson-gold/15 border-t-2 border-t-wilson-gold lg:border-t-2"
                  : "border-t border-t-white/[0.08] lg:border-t-0"
              }`}
            >
              <span
                className={`font-montserrat text-[10px] tracking-[0.25em] uppercase block mb-3.5 ${
                  t.featured ? "text-wilson-gold" : "text-wilson-gold/90"
                }`}
              >
                {t.tag}
              </span>
              <h3
                className={`font-garamond text-2xl md:text-[28px] mb-4 ${
                  t.featured ? "text-wilson-ivory" : "text-wilson-ivory"
                }`}
              >
                {t.name}
              </h3>
              <p
                className={`font-montserrat text-sm leading-7 mb-7 ${
                  t.featured ? "text-wilson-sand/85" : "text-wilson-sand/70"
                }`}
              >
                {t.desc}
              </p>
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block font-montserrat text-xs tracking-[0.15em] uppercase no-underline py-2.5 px-6 border transition-colors duration-200 ${
                  t.featured
                    ? "border-wilson-gold text-wilson-gold hover:bg-wilson-gold hover:text-wilson-blue-deep"
                    : "border-wilson-gold/60 text-wilson-gold/80 hover:border-wilson-gold hover:text-wilson-gold"
                }`}
              >
                Reservar →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ── clean grid, no 1px gap hack */}
      <section id="servicios" className="bg-wilson-ivory py-20 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2
              className="font-garamond text-wilson-blue-deep leading-[0.95]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.875rem)" }}
            >
              Todo lo que necesitás
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {services.map((s, i) => (
              <div key={i} className="py-2">
                <div className="w-9 h-px bg-wilson-gold mb-5" />
                <h3 className="font-garamond text-xl md:text-2xl text-wilson-blue-deep mb-2.5">
                  {s.name}
                </h3>
                <p className="font-montserrat text-sm text-wilson-graphite leading-7 opacity-[0.88]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── editorial grid */}
      <section id="galeria" className="py-20 md:py-24 px-4 md:px-8 bg-wilson-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2
                className="font-garamond text-wilson-blue-deep"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.875rem)" }}
              >
                Descubrí el hotel
              </h2>
            </div>
            <a
              href="https://instagram.com/wilsonhotel.salta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-xs tracking-[0.2em] uppercase text-[var(--blue-muted)] hover:text-wilson-blue-deep transition-colors"
            >
              @wilsonhotel.salta →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-2">
            {galleryPhotos.map((p, i) => (
              <div key={i} className={`overflow-hidden group ${p.span}`}>
                <img
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOOKING ── subtle gold accent, not full gold bg */}
      <section className="bg-wilson-blue-deep py-20 md:py-24 px-4 md:px-8 text-center relative overflow-hidden">
        {/* Subtle gold line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-wilson-gold/30" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-wilson-gold/70 block mb-5">
            Reservas online · Mejor precio garantizado
          </span>
          <h2
            className="font-garamond text-wilson-ivory mb-3 leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            Reservá<br /><em>tu estadía</em>
          </h2>
          <p className="font-montserrat text-sm text-wilson-sand/80 mt-6 mb-10 leading-7">
            Desayuno buffet incluido en todas las tarifas.<br />
            Cancelación gratuita hasta 72hs antes del check-in.
          </p>
          <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Ver disponibilidad →
          </a>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-20 md:py-24 px-4 md:px-8 bg-wilson-ivory">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2
              className="font-garamond text-wilson-blue-deep mb-10"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
            >
              Contacto
            </h2>
            <div className="flex flex-col">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-6 border-b border-wilson-sand py-4"
                >
                  <span className="font-montserrat text-[10px] tracking-[0.22em] uppercase text-[var(--blue-muted)] w-[72px] flex-shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-montserrat text-sm text-wilson-blue-deep no-underline hover:text-wilson-gold transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-montserrat text-sm text-wilson-graphite">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="font-montserrat text-[10px] text-wilson-graphite/75 mt-6 leading-relaxed">
              Check-in: 14:00 hs · Check-out: 10:00 hs<br />
              Cancelación gratuita hasta 72hs antes · IVA 21% incluido
            </p>
          </div>
          <div className="h-72 md:h-96 lg:h-[460px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Wilson Hotel"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-wilson-blue-deep py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <LogoIsotipo variant="light" size={52} />
          </div>
          <p className="font-montserrat text-[10px] text-wilson-sand/70 text-center">
            © {new Date().getFullYear()} Wilson Hotel S.A. · Todos los derechos reservados
          </p>
          <p className="font-montserrat text-[10px] text-wilson-sand/70 text-center md:text-right">
            reservas@wilsonhotel.com.ar<br />IVA 21% incluido
          </p>
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
