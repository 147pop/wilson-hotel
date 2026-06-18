"use client";
import Logo from "@/components/brand/Logo";
import StarRating from "@/components/ui/StarRating";
import SectionDivider from "@/components/ui/SectionDivider";
import { useState } from "react";

export default function HeroA() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-wilson-blue-deep/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo variant="light" size="sm" />

          <nav className="hidden md:flex items-center gap-8">
            {["Habitaciones", "Servicios", "Galería", "Ubicación"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace("ó", "o").replace("á", "a"))}
                className="font-montserrat text-xs uppercase tracking-widest text-wilson-sand hover:text-wilson-gold transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/543874312211"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-xs uppercase tracking-widest text-wilson-sand hover:text-wilson-gold transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={() => scrollTo("reservas")}
              className="btn-gold text-xs py-2 px-5"
            >
              Reservar
            </button>
          </div>

          <button
            className="md:hidden text-white"
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
          <div className="md:hidden bg-wilson-blue-deep border-t border-white/10 px-4 py-4 space-y-3">
            {["Habitaciones", "Servicios", "Galería", "Ubicación"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left font-montserrat text-sm text-wilson-sand hover:text-wilson-gold transition-colors py-1"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("reservas")}
              className="w-full btn-gold text-xs py-2 mt-2"
            >
              Reservar ahora
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0B2C57 0%, #123E7A 50%, #1a4f9a 100%)",
        }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Decorative corner elements */}
        <div className="absolute top-24 left-8 w-16 h-16 border-t border-l border-wilson-gold/30" />
        <div className="absolute top-24 right-8 w-16 h-16 border-t border-r border-wilson-gold/30" />
        <div className="absolute bottom-12 left-8 w-16 h-16 border-b border-l border-wilson-gold/30" />
        <div className="absolute bottom-12 right-8 w-16 h-16 border-b border-r border-wilson-gold/30" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <StarRating count={3} size={20} className="justify-center mb-6" />

          <h1 className="font-garamond text-5xl md:text-7xl lg:text-8xl text-wilson-ivory leading-none mb-4">
            Wilson Hotel
          </h1>

          <SectionDivider light className="max-w-xs mx-auto mb-6" />

          <p className="font-garamond text-xl md:text-2xl text-wilson-sand italic mb-8">
            Hospedate en el corazón de Salta
          </p>

          <p className="font-montserrat text-sm text-wilson-sand/70 uppercase tracking-widest mb-12">
            Alvarado 950 · Salta, Argentina
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              className="btn-outline-white px-10 py-4 text-sm flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultar
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-wilson-sand/40">
          <span className="font-montserrat text-xs uppercase tracking-widest">Descubrí</span>
          <div className="w-px h-12 bg-wilson-gold/30 animate-pulse" />
        </div>
      </section>
    </>
  );
}
