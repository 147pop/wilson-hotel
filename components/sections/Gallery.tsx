import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";
import { GALLERY_IMAGES } from "@/lib/hotel-images";

interface GalleryProps {
  variant?: "light" | "dark";
}

const photos = GALLERY_IMAGES;

export default function Gallery({ variant = "light" }: GalleryProps) {
  const bg = variant === "dark" ? "bg-wilson-blue" : "bg-wilson-ivory";
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
            <Link
              key={i}
              href="/galeria"
              className={`overflow-hidden group block ${"span" in photo ? photo.span : ""}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>

        <p className="font-montserrat text-xs text-center text-wilson-gold uppercase tracking-widest mt-6 opacity-70">
          @wilsonhotel.salta
        </p>

        <div className="text-center mt-8">
          <Link href="/galeria" className="btn-outline-gold">
            Ver galería completa
          </Link>
        </div>
      </div>
    </section>
  );
}
