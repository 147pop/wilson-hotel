"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface LightboxProps {
  photos: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const prev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const next = () => onNavigate((index + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta > 0 ? prev : next)();
        touchStartX.current = null;
      }}
    >
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-wilson-blue-deep/60 backdrop-blur-sm text-wilson-ivory hover:bg-wilson-gold hover:text-wilson-blue-deep text-2xl leading-none transition-colors z-10"
      >
        ×
      </button>

      <button
        aria-label="Anterior"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 md:left-6 w-11 h-11 flex items-center justify-center rounded-full bg-wilson-blue-deep/60 backdrop-blur-sm text-wilson-ivory hover:bg-wilson-gold hover:text-wilson-blue-deep text-3xl transition-colors z-10"
      >
        ‹
      </button>

      <div
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt=""
          fill
          sizes="90vw"
          priority
          className="object-contain"
        />
      </div>

      <button
        aria-label="Siguiente"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 md:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-wilson-blue-deep/60 backdrop-blur-sm text-wilson-ivory hover:bg-wilson-gold hover:text-wilson-blue-deep text-3xl transition-colors z-10"
      >
        ›
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-montserrat text-xs tracking-widest text-wilson-ivory/60">
        <span className="text-wilson-gold">★</span> {index + 1} / {photos.length}
      </p>
    </div>
  );
}
