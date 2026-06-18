"use client";
import Logo from "@/components/brand/Logo";
import StarRating from "@/components/ui/StarRating";
import SectionDivider from "@/components/ui/SectionDivider";
import BookingWidget from "@/components/ui/BookingWidget";
import { useState } from "react";

export default function HeroB() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm border-b border-wilson-sand/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo variant="dark" size="sm" />

          <nav className="hidden md:flex items-center gap-8">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-montserrat text-xs uppercase tracking-widest text-wilson-graphite hover:text-wilson-gold transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+543874312211"
              className="font-montserrat text-xs text-wilson-graphite opacity-60 hover:opacity-100 transition-opacity"
            >
              (387) 4-312211
            </a>
            <button
              onClick={() => scrollTo("reservas")}
              className="btn-gold text-xs py-2 px-5"
            >
              Reservar
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B2C57" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-wilson-sand/30 px-6 py-4 space-y-3">
            {["Habitaciones", "Servicios", "Galería", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left font-montserrat text-sm text-wilson-graphite py-1"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Split */}
      <section className="pt-16 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image */}
        <div className="relative min-h-[50vh] lg:min-h-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80"
            alt="Habitación Wilson Hotel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          {/* City badge */}
          <div className="absolute bottom-6 left-6 bg-wilson-blue-deep/90 backdrop-blur-sm px-4 py-3">
            <p className="font-montserrat text-xs text-wilson-gold uppercase tracking-widest">Salta, Argentina</p>
            <p className="font-garamond text-lg text-white">Centro histórico</p>
          </div>
        </div>

        {/* Right: Content + Widget */}
        <div className="bg-wilson-ivory flex flex-col justify-center px-8 md:px-16 py-16">
          <StarRating count={3} size={16} className="mb-6" />

          <Logo variant="dark" size="md" className="mb-6" />

          <SectionDivider className="justify-start mb-6" />

          <h1 className="font-garamond text-4xl md:text-5xl text-wilson-blue-deep leading-tight mb-4">
            Hospedate en el<br />
            <span className="text-wilson-gold italic">corazón de Salta</span>
          </h1>

          <p className="font-montserrat text-sm text-wilson-graphite opacity-70 leading-relaxed mb-8 max-w-md">
            Hotel 3 estrellas a pasos de la Plaza 9 de Julio. Desayuno buffet incluido,
            atención personalizada y más de 40 años de trayectoria.
          </p>

          {/* Booking widget inline */}
          <BookingWidget variant="light" className="mb-6" />

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/543874312211"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold flex items-center gap-2 hover:text-wilson-blue transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultar por WhatsApp
            </a>
            <span className="text-wilson-sand">|</span>
            <a
              href="tel:+543874312211"
              className="font-montserrat text-xs uppercase tracking-widest text-wilson-graphite opacity-50 hover:opacity-100 transition-opacity"
            >
              Llamar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
