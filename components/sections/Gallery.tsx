import SectionDivider from "@/components/ui/SectionDivider";

interface GalleryProps {
  variant?: "light" | "dark";
}

const photos = [
  { src: "/hotel/amenities/home/home-01.webp", alt: "Lobby del hotel", span: "col-span-2 row-span-2" },
  { src: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite matrimonial", span: "" },
  { src: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno buffet", span: "" },
  { src: "/hotel/amenities/salon/salon-01.webp", alt: "Salón de eventos", span: "" },
  { src: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Habitación twin", span: "" },
  { src: "/hotel/amenities/fachada/fachada-01.webp", alt: "Fachada del hotel", span: "" },
];

export default function Gallery({ variant = "light" }: GalleryProps) {
  const bg = variant === "dark" ? "bg-wilson-blue-deep" : "bg-wilson-ivory";
  const titleColor = variant === "dark" ? "text-wilson-ivory" : "text-wilson-blue-deep";

  return (
    <section className={`${bg} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
            Galería
          </p>
          <h2 className={`font-garamond text-4xl md:text-5xl ${titleColor}`}>
            Descubrí el Wilson Hotel
          </h2>
          <SectionDivider light={variant === "dark"} className="mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`overflow-hidden group ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <p className="font-montserrat text-xs text-center text-wilson-gold uppercase tracking-widest mt-6 opacity-70">
          @wilsonhotel.salta
        </p>
      </div>
    </section>
  );
}
