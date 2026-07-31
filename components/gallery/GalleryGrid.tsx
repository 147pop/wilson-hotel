"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/gallery/Lightbox";
import type { GalleryCategory } from "@/lib/hotel-images";

interface GalleryGridProps {
  categories: GalleryCategory[];
}

function CategoryIcon({ slug }: { slug: string }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "w-4 h-4 shrink-0" };
  switch (slug) {
    case "todas":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "fachada":
      return (
        <svg {...props}>
          <rect x="5" y="3" width="14" height="18" />
          <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
        </svg>
      );
    case "desayuno":
      return (
        <svg {...props}>
          <path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
          <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path d="M8 3c0 1-1 1-1 2M12 3c0 1-1 1-1 2" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
      );
    case "salon":
      return (
        <svg {...props}>
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="2" y="11" width="20" height="7" rx="1" />
          <path d="M2 18v2M22 18v2" />
          <path d="M5 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
        </svg>
      );
  }
}

const CAPTIONS: Record<string, string> = {
  "triple-ms": "Descanso que se siente",
  "triple-simple": "Descanso que se siente",
  "single-standard": "Descanso que se siente",
  "doble-single": "Descanso que se siente",
  "doble-suite-sillas": "Descanso que se siente",
  "doble-standard": "Descanso que se siente",
  "doble-suite-sillones": "Descanso que se siente",
  desayuno: "Desayunos que te reciben bien",
  fachada: "En el corazón de Salta",
  home: "Tu lugar en Salta",
  salon: "Experiencias que quedan",
};

export default function GalleryGrid({ categories }: GalleryGridProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCategory = categories.find((c) => c.slug === selectedSlug);

  const filterGroups = [
    { label: "Habitaciones", categories: categories.filter((c) => c.photos[0]?.includes("/habitaciones/")) },
    { label: "Instalaciones", categories: categories.filter((c) => c.photos[0]?.includes("/amenities/")) },
  ];

  const items =
    selectedSlug === "todas"
      ? categories.flatMap((c) => c.photos.map((src) => ({ src, slug: c.slug, label: c.label })))
      : (activeCategory?.photos ?? []).map((src) => ({
          src,
          slug: selectedSlug,
          label: activeCategory?.label ?? "",
        }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setSelectedSlug("todas")}
            className={`flex flex-col items-center justify-center gap-1.5 w-24 h-24 px-1.5 border transition-colors ${
              selectedSlug === "todas"
                ? "border-wilson-gold bg-wilson-gold/10 text-wilson-blue-deep"
                : "border-wilson-sand bg-white text-wilson-blue-muted hover:border-wilson-gold"
            }`}
          >
            <CategoryIcon slug="todas" />
            <span className="font-montserrat text-[9px] leading-tight tracking-wide uppercase text-center line-clamp-2">Todas</span>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
          {filterGroups.map((group) => (
            <div key={group.label}>
              <p className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-wilson-gold text-center mb-2.5 opacity-80">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {group.categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setSelectedSlug(c.slug)}
                    className={`flex flex-col items-center justify-center gap-1.5 w-24 h-24 px-1.5 border transition-colors ${
                      selectedSlug === c.slug
                        ? "border-wilson-gold bg-wilson-gold/10 text-wilson-blue-deep"
                        : "border-wilson-sand bg-white text-wilson-blue-muted hover:border-wilson-gold"
                    }`}
                  >
                    <CategoryIcon slug={c.slug} />
                    <span className="font-montserrat text-[9px] leading-tight tracking-wide uppercase text-center line-clamp-2">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-center font-montserrat text-sm text-wilson-graphite opacity-70">
          Próximamente más fotos de esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {items.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={`${item.label} — Wilson Hotel`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(11,44,87,0.88) 0%, rgba(11,44,87,0.35) 45%, transparent 75%)" }}
              >
                <span className="font-montserrat text-[11px] md:text-xs font-semibold uppercase tracking-wide text-wilson-ivory translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {CAPTIONS[item.slug] ?? item.label}
                </span>
                <span className="font-montserrat text-[9px] tracking-[0.3em] text-wilson-gold uppercase mt-1">
                  ★★★ Wilson
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={items.map((item) => item.src)}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
