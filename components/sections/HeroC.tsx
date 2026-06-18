"use client";
import Logo from "@/components/brand/Logo";
import StarRating from "@/components/ui/StarRating";
import SectionDivider from "@/components/ui/SectionDivider";
import { useState, useEffect } from "react";

export default function HeroC() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar — transparent to filled on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-wilson-blue-deep shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo variant="light" size="sm" />

          <nav className="hidden md:flex items-center gap-10">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-montserrat text-xs uppercase tracking-widest text-wilson-ivory/80 hover:text-wilson-gold transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("reservas")}
            className="hidden md:block btn-outline-gold text-xs py-2 px-6"
          >
            Reservar
          </button>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-wilson-blue-deep/98 border-t border-white/10 px-6 py-4 space-y-4">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left font-montserrat text-sm text-wilson-sand py-1"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero — Dark luxury */}
      <section className="relative min-h-screen bg-wilson-blue-deep overflow-hidden flex items-center">
        {/* Geometric accent — diagonal photo element */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hotel/amenities/home/home-01.webp"
            className="w-full h-full object-cover opacity-40"
            preload="metadata"
          >
            <source src="/hotel/amenities/home/home-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-wilson-blue-deep via-wilson-blue-deep/60 to-transparent" />
        </div>

        {/* Gold line accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wilson-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wilson-gold/40 to-transparent" />
        <div className="absolute left-16 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-wilson-gold/30 to-transparent hidden xl:block" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <StarRating count={3} size={16} />
              <div className="h-px w-12 bg-wilson-gold/50" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold">
                Salta, Argentina
              </span>
            </div>

            <h1 className="font-garamond text-6xl md:text-7xl lg:text-8xl text-wilson-ivory leading-none mb-2">
              Wilson
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <h1 className="font-garamond text-6xl md:text-7xl lg:text-8xl text-wilson-gold leading-none">
                Hotel
              </h1>
              <div className="flex-1 h-px bg-wilson-gold/30 max-w-32 hidden sm:block" />
            </div>

            <SectionDivider light className="justify-start mb-8" />

            <p className="font-garamond text-xl md:text-2xl text-wilson-sand/80 italic mb-4 leading-relaxed">
              Hospedate en el corazón de Salta
            </p>
            <p className="font-montserrat text-sm text-wilson-sand/50 leading-relaxed mb-10 max-w-md">
              Más de 40 años de tradición hotelera. Desayuno buffet incluido,
              atención personalizada y ubicación inmejorable a pasos de la Plaza 9 de Julio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("reservas")}
                className="btn-gold px-10 py-4 text-sm"
              >
                Reservar ahora
              </button>
              <a
                href="https://wa.me/543874312211"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold px-10 py-4 text-sm flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { num: "40+", label: "Años de trayectoria" },
                { num: "5", label: "Tipos de habitación" },
                { num: "★★★", label: "Hotel categoría" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-montserrat text-xl sm:text-2xl text-wilson-gold">{stat.num}</p>
                  <p className="font-montserrat text-xs text-wilson-sand/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
