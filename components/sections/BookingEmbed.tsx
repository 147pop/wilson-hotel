import SectionDivider from "@/components/ui/SectionDivider";

export default function BookingEmbed() {
  return (
    <section id="reservas" className="bg-wilson-ivory py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
            Reservas online
          </p>
          <h2 className="font-garamond text-4xl md:text-5xl text-wilson-blue-deep">
            Reservar ahora
          </h2>
          <SectionDivider className="mt-4" />
          <p className="font-montserrat text-sm text-wilson-graphite opacity-60 mt-4">
            Seleccioná fechas y habitación. Pago seguro con tarjeta de crédito.
          </p>
        </div>

        <div className="border border-wilson-sand/50 shadow-lg overflow-hidden bg-white">
          <iframe
            src="https://motor.winpax.com.ar/search.php?hotel_id=133"
            width="100%"
            height="850"
            frameBorder="0"
            title="Motor de reservas Wilson Hotel"
            loading="lazy"
            className="block"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="font-montserrat text-xs text-wilson-graphite opacity-50">
            ¿Necesitás ayuda? Llamanos al{" "}
            <a href="tel:+543874312211" className="text-wilson-gold hover:underline">
              (+54 387) 4-312211
            </a>{" "}
            o escribinos por{" "}
            <a
              href="https://wa.me/543874312211"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wilson-gold hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
