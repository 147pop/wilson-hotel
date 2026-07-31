import type { Metadata } from "next";
import Link from "next/link";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import SectionDivider from "@/components/ui/SectionDivider";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GALLERY_CATEGORIES } from "@/lib/hotel-images";

const BOOKING = "https://motor.winpax.com.ar/search.php?hotel_id=133";

export const metadata: Metadata = {
  title: "Galería de fotos — Wilson Hotel Salta",
  description:
    "Recorré las habitaciones, el desayuno y la fachada del Wilson Hotel en fotos.",
};

export default function GaleriaPage() {
  return (
    <main className="bg-wilson-ivory min-h-screen">
      <header className="border-b-2 border-wilson-sand">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-[88px] flex items-center justify-between">
          <Link href="/">
            <LogoHorizontal variant="dark" size={72} />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="nav-link-dark">
              Volver al inicio
            </Link>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "9px 22px" }}>
              Reservar ahora
            </a>
          </div>
        </div>
      </header>

      <div className="text-center pt-14">
        <p className="font-montserrat text-xs tracking-widest uppercase text-wilson-gold mb-3">
          Galería
        </p>
        <h1 className="font-garamond text-4xl md:text-5xl text-wilson-blue-deep">
          Descubrí el Wilson Hotel
        </h1>
        <SectionDivider className="mt-4" />
      </div>

      <GalleryGrid categories={GALLERY_CATEGORIES} />
    </main>
  );
}
