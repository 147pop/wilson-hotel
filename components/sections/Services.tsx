import SectionDivider from "@/components/ui/SectionDivider";

interface ServicesProps {
  variant?: "light" | "dark";
}

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Desayuno buffet",
    description: "Incluido en todas las tarifas. Variedad de opciones para comenzar el día de la mejor manera.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "WiFi gratuito",
    description: "Conectividad de alta velocidad en todas las habitaciones y áreas comunes del hotel.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Salones de eventos",
    description: "Espacios equipados para reuniones, conferencias y celebraciones. Ideal para grupos.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="11" r="3" />
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
      </svg>
    ),
    title: "Ubicación céntrica",
    description: "A pasos de la Plaza 9 de Julio, catedrales y los principales atractivos turísticos de Salta.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Seguridad y confianza",
    description: "Más de 40 años recibiendo huéspedes. Atención personalizada y dedicación en cada estadía.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Tarjetas y pagos",
    description: "Aceptamos Visa, Mastercard y American Express. Tarifas reembolsables y no reembolsables disponibles.",
  },
];

export default function Services({ variant = "light" }: ServicesProps) {
  const bg = variant === "dark" ? "bg-[#091f40]" : "bg-wilson-blue-deep";
  const textColor = "text-wilson-sand";
  const cardBg = "bg-white/5 border border-white/10";

  return (
    <section className={`${bg} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
            Servicios & amenidades
          </p>
          <h2 className="font-garamond text-4xl md:text-5xl text-wilson-ivory">
            Todo lo que necesitás
          </h2>
          <SectionDivider light className="mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className={`${cardBg} p-6 hover:bg-white/10 transition-colors duration-300`}>
              <div className="text-wilson-gold mb-4">{service.icon}</div>
              <h3 className="font-garamond text-xl text-wilson-ivory mb-2">{service.title}</h3>
              <p className={`font-montserrat text-sm leading-relaxed ${textColor} opacity-70`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Planes tarifarios */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-2">Tarifas</p>
            <h3 className="font-garamond text-3xl text-wilson-ivory">Planes disponibles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-5">
              <p className="font-garamond text-lg text-wilson-ivory mb-1">Alojamiento y Desayuno</p>
              <p className="font-montserrat text-xs text-wilson-gold uppercase tracking-wider mb-3">Reembolsable · Pago en el hotel</p>
              <p className="font-montserrat text-sm text-wilson-sand opacity-70">Cancelación gratuita hasta 72hs antes del arribo. Garantía con tarjeta de crédito.</p>
            </div>
            <div className="bg-wilson-gold/10 border border-wilson-gold/40 p-5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wilson-gold text-wilson-blue-deep font-montserrat text-xs font-bold px-4 py-1 uppercase tracking-wider">
                Oferta
              </div>
              <p className="font-garamond text-lg text-wilson-ivory mb-1">Último Minuto</p>
              <p className="font-montserrat text-xs text-wilson-gold uppercase tracking-wider mb-3">No reembolsable · −15% descuento</p>
              <p className="font-montserrat text-sm text-wilson-sand opacity-70">Mejor precio garantizado. Pago anticipado con tarjeta de crédito.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5">
              <p className="font-garamond text-lg text-wilson-ivory mb-1">No Reembolsable</p>
              <p className="font-montserrat text-xs text-wilson-gold uppercase tracking-wider mb-3">No reembolsable · −10% descuento</p>
              <p className="font-montserrat text-sm text-wilson-sand opacity-70">Precio especial con pago anticipado total. Sin posibilidad de reembolso.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
