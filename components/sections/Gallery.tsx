import SectionDivider from "@/components/ui/SectionDivider";

interface GalleryProps {
  variant?: "light" | "dark";
}

const photos = [
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Habitación doble", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", alt: "Habitación twin", span: "" },
  { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", alt: "Baño privado", span: "" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Desayuno buffet", span: "" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", alt: "Suite matrimonial", span: "" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Fachada del hotel", span: "" },
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
