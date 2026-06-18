import SectionDivider from "@/components/ui/SectionDivider";

interface RoomsProps {
  variant?: "light" | "dark";
}

const rooms = [
  {
    code: "SGL",
    name: "Habitación Simple",
    description: "Confort y privacidad para el viajero individual. Cama matrimonial, baño privado, aire acondicionado y WiFi.",
    occupancy: "1 persona",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    code: "MAT",
    name: "Doble Matrimonial",
    description: "Ambiente acogedor para parejas. Cama doble, amplio baño privado, AC y TV.",
    occupancy: "1–2 personas",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
  },
  {
    code: "TWN",
    name: "Doble Twin",
    description: "Dos camas individuales, ideal para compañeros de viaje o familia. Posibilidad de cama extra.",
    occupancy: "1–2 personas + cama extra",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80",
  },
  {
    code: "JRS",
    name: "Suite Matrimonial",
    description: "Nuestra habitación más amplia y equipada. Mayor comodidad, decoración cuidada y espacio adicional.",
    occupancy: "1–2 personas + cama extra",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  },
  {
    code: "TPL",
    name: "Triple",
    description: "Tres plazas en un ambiente cómodo y funcional. Perfecta para familias o grupos pequeños.",
    occupancy: "1–3 personas",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
  },
];

export default function Rooms({ variant = "light" }: RoomsProps) {
  const bg = variant === "dark" ? "bg-wilson-blue-deep" : "bg-wilson-ivory";
  const titleColor = variant === "dark" ? "text-wilson-ivory" : "text-wilson-blue-deep";
  const textColor = variant === "dark" ? "text-wilson-sand" : "text-wilson-graphite";
  const cardBg = variant === "dark" ? "bg-wilson-blue/40" : "bg-white";
  const cardBorder = variant === "dark" ? "border-wilson-blue" : "border-wilson-sand/30";

  return (
    <section className={`${bg} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
            Nuestras habitaciones
          </p>
          <h2 className={`font-garamond text-4xl md:text-5xl ${titleColor}`}>
            Espacios diseñados para su descanso
          </h2>
          <SectionDivider light={variant === "dark"} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.code}
              className={`${cardBg} border ${cardBorder} overflow-hidden group hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-wilson-gold text-wilson-blue-deep font-montserrat text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Desayuno incluido
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="font-montserrat text-xs text-wilson-gold uppercase tracking-widest mb-1">
                  {room.occupancy}
                </p>
                <h3 className={`font-garamond text-xl mb-2 ${titleColor}`}>{room.name}</h3>
                <p className={`font-montserrat text-sm leading-relaxed mb-4 ${textColor} opacity-80`}>
                  {room.description}
                </p>
                <a
                  href="#reservas"
                  className="inline-block font-montserrat text-xs uppercase tracking-widest text-wilson-gold border-b border-wilson-gold pb-0.5 hover:text-wilson-sand hover:border-wilson-sand transition-colors"
                >
                  Ver disponibilidad →
                </a>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="bg-wilson-blue-deep border border-wilson-blue flex flex-col items-center justify-center p-8 text-center">
            <p className="font-garamond text-2xl text-wilson-ivory mb-3">
              ¿Grupos o eventos?
            </p>
            <p className="font-montserrat text-sm text-wilson-sand opacity-80 mb-6">
              Capacidad para grupos y salones de eventos disponibles. Consultenos.
            </p>
            <a
              href="https://wa.me/543874312211"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-xs"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
