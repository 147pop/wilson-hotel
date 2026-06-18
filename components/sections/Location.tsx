import SectionDivider from "@/components/ui/SectionDivider";

interface LocationProps {
  variant?: "light" | "dark";
}

export default function Location({ variant = "light" }: LocationProps) {
  const bg = variant === "dark" ? "bg-[#091f40]" : "bg-wilson-sand/30";
  const titleColor = variant === "dark" ? "text-wilson-ivory" : "text-wilson-blue-deep";
  const textColor = variant === "dark" ? "text-wilson-sand" : "text-wilson-graphite";

  return (
    <section className={`${bg} py-20 px-4`} id="contacto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
            Cómo llegar
          </p>
          <h2 className={`font-garamond text-4xl md:text-5xl ${titleColor}`}>
            En el corazón de Salta
          </h2>
          <SectionDivider light={variant === "dark"} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Mapa */}
          <div className="w-full h-80 lg:h-96 overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d-65.4095!3d-24.7859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzA5LjIiUyA2NcKwMjQnMzQuMiJX!5e0!3m2!1ses!2sar!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Wilson Hotel - Alvarado 950, Salta"
            />
          </div>

          {/* Info de contacto */}
          <div className="space-y-6">
            <div>
              <p className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold mb-3">Dirección</p>
              <p className={`font-garamond text-2xl ${titleColor}`}>Alvarado 950</p>
              <p className={`font-montserrat text-sm ${textColor} opacity-70`}>Salta Capital, Argentina</p>
              <p className={`font-montserrat text-sm ${textColor} opacity-60 mt-1`}>
                A 2 cuadras de la Plaza 9 de Julio
              </p>
            </div>

            <div className="h-px bg-wilson-gold/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold mb-2">Teléfono</p>
                <a
                  href="tel:+543874312211"
                  className={`font-montserrat text-sm ${textColor} hover:text-wilson-gold transition-colors`}
                >
                  (+54 387) 4-312211
                </a>
              </div>
              <div>
                <p className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold mb-2">Email</p>
                <a
                  href="mailto:info@wilsonhotel.com.ar"
                  className={`font-montserrat text-sm ${textColor} hover:text-wilson-gold transition-colors`}
                >
                  info@wilsonhotel.com.ar
                </a>
              </div>
              <div>
                <p className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold mb-2">Check-in</p>
                <p className={`font-montserrat text-sm ${textColor} opacity-70`}>14:00 hs</p>
              </div>
              <div>
                <p className="font-montserrat text-xs uppercase tracking-widest text-wilson-gold mb-2">Check-out</p>
                <p className={`font-montserrat text-sm ${textColor} opacity-70`}>10:00 hs</p>
              </div>
            </div>

            <div className="h-px bg-wilson-gold/30" />

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/543874312211"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:info@wilsonhotel.com.ar"
                className={`btn-outline-${variant === "dark" ? "gold" : "gold"} text-xs`}
              >
                Enviar email
              </a>
            </div>

            <p className={`font-montserrat text-xs ${textColor} opacity-50`}>
              Cancelación gratuita hasta 72hs antes del check-in · IVA 21% incluido
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
