export const ROOM_IMAGES = {
  SGL: {
    slug: "single-standard",
    hero: "/hotel/habitaciones/single-standard/single-standard-02.webp",
    photos: [
      "/hotel/habitaciones/single-standard/single-standard-02.webp",
      "/hotel/habitaciones/single-standard/single-standard-01.webp",
      "/hotel/habitaciones/single-standard/single-standard-03.webp",
    ],
    thumbs: [
      "/hotel/habitaciones/single-standard/single-standard-02-thumb.webp",
      "/hotel/habitaciones/single-standard/single-standard-01-thumb.webp",
      "/hotel/habitaciones/single-standard/single-standard-03-thumb.webp",
    ],
    video: "/hotel/habitaciones/single-standard/single-standard-video.mp4",
    poster: "/hotel/posters/single-standard-poster.webp",
  },
  MAT: {
    slug: "doble-standard",
    hero: "/hotel/habitaciones/doble-standard/doble-standard-01.webp",
    photos: [
      "/hotel/habitaciones/doble-standard/doble-standard-01.webp",
      "/hotel/habitaciones/doble-standard/doble-standard-02.webp",
    ],
    thumbs: [
      "/hotel/habitaciones/doble-standard/doble-standard-01-thumb.webp",
      "/hotel/habitaciones/doble-standard/doble-standard-02-thumb.webp",
    ],
    video: "/hotel/habitaciones/doble-standard/doble-standard-video.mp4",
    poster: "/hotel/posters/doble-standard-poster.webp",
  },
  TWN: {
    slug: "doble-single",
    hero: "/hotel/habitaciones/doble-single/doble-single-01.webp",
    photos: [
      "/hotel/habitaciones/doble-single/doble-single-01.webp",
      "/hotel/habitaciones/doble-single/doble-single-02.webp",
      "/hotel/habitaciones/doble-single/doble-single-03.webp",
    ],
    thumbs: [
      "/hotel/habitaciones/doble-single/doble-single-01-thumb.webp",
      "/hotel/habitaciones/doble-single/doble-single-02-thumb.webp",
      "/hotel/habitaciones/doble-single/doble-single-03-thumb.webp",
    ],
    video: "/hotel/habitaciones/doble-single/doble-single-video.mp4",
    poster: "/hotel/posters/doble-single-poster.webp",
  },
  JRS: {
    slug: "doble-suite-sillones",
    hero: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp",
    photos: [
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp",
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-03.webp",
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-01.webp",
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-07.webp",
      "/hotel/habitaciones/doble-suite-sillas/doble-suite-sillas-01.webp",
      "/hotel/habitaciones/doble-suite-sillas/doble-suite-sillas-03.webp",
    ],
    thumbs: [
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05-thumb.webp",
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-03-thumb.webp",
      "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-01-thumb.webp",
    ],
    video: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-video.mp4",
    poster: "/hotel/posters/doble-suite-sillones-poster.webp",
  },
  TPL: {
    slug: "triple-ms",
    hero: "/hotel/habitaciones/triple-ms/triple-ms-01.webp",
    photos: [
      "/hotel/habitaciones/triple-ms/triple-ms-01.webp",
      "/hotel/habitaciones/triple-ms/triple-ms-02.webp",
      "/hotel/habitaciones/triple-ms/triple-ms-03.webp",
      "/hotel/habitaciones/triple-simple/triple-simple-01.webp",
      "/hotel/habitaciones/triple-simple/triple-simple-02.webp",
    ],
    thumbs: [
      "/hotel/habitaciones/triple-ms/triple-ms-01-thumb.webp",
      "/hotel/habitaciones/triple-ms/triple-ms-02-thumb.webp",
      "/hotel/habitaciones/triple-ms/triple-ms-03-thumb.webp",
    ],
    video: "/hotel/habitaciones/triple-ms/triple-ms-video.mp4",
    poster: "/hotel/posters/triple-ms-poster.webp",
  },
} as const;

export const AMENITY_IMAGES = {
  desayuno: {
    photos: [
      "/hotel/amenities/desayuno/desayuno-01.webp",
      "/hotel/amenities/desayuno/desayuno-03.webp",
      "/hotel/amenities/desayuno/desayuno-04.webp",
      "/hotel/amenities/desayuno/desayuno-12.webp",
    ],
    video: "/hotel/amenities/desayuno/desayuno-video.mp4",
    poster: "/hotel/posters/desayuno-poster.webp",
  },
  fachada: {
    photos: [
      "/hotel/amenities/fachada/fachada-01.webp",
      "/hotel/amenities/fachada/fachada-02.webp",
      "/hotel/amenities/fachada/fachada-03.webp",
    ],
  },
  home: {
    photos: ["/hotel/amenities/home/home-01.webp"],
    video: "/hotel/amenities/home/home-video.mp4",
    poster: "/hotel/posters/home-poster.webp",
  },
  salon: {
    photos: [
      "/hotel/amenities/salon/salon-01.webp",
      "/hotel/amenities/salon/salon-02.webp",
      "/hotel/amenities/salon/salon-03.webp",
    ],
    video: "/hotel/amenities/salon/salon-video.mp4",
    poster: "/hotel/posters/salon-poster.webp",
  },
} as const;

export const HERO_IMAGES = {
  a: {
    primary: "/hotel/habitaciones/doble-suite-sillas/doble-suite-sillas-01.webp",
    secondary: "/hotel/amenities/desayuno/desayuno-03.webp",
  },
  b: "/hotel/habitaciones/doble-standard/doble-standard-01.webp",
  c: "/hotel/amenities/home/home-01.webp",
} as const;

// Categorías de la galería completa (/galeria). Independiente de ROOM_IMAGES/
// AMENITY_IMAGES: esas agrupan por código de tarifa (ROOM_IMAGES.JRS mezcla
// dos slugs físicos distintos), mientras que esto necesita 1 slug = 1 carpeta
// física = 1 tab. Los arrays `photos` se completan corriendo
// scripts/convert-gallery-photos.mjs y pegando su output acá.
export type GalleryCategory = {
  slug: string;
  label: string;
  photos: string[];
};

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    slug: "triple-ms",
    label: "Triple",
    photos: [
      "/hotel/galeria/habitaciones/triple-ms/triple-ms-01.webp",
      "/hotel/galeria/habitaciones/triple-ms/triple-ms-02.webp",
      "/hotel/galeria/habitaciones/triple-ms/triple-ms-03.webp",
    ],
  },
  {
    slug: "triple-simple",
    label: "Triple Simple",
    photos: [
      "/hotel/galeria/habitaciones/triple-simple/triple-simple-01.webp",
      "/hotel/galeria/habitaciones/triple-simple/triple-simple-02.webp",
      "/hotel/galeria/habitaciones/triple-simple/triple-simple-03.webp",
      "/hotel/galeria/habitaciones/triple-simple/triple-simple-04.webp",
    ],
  },
  {
    slug: "single-standard",
    label: "Habitación Simple",
    photos: [
      "/hotel/galeria/habitaciones/single-standard/single-standard-01.webp",
      "/hotel/galeria/habitaciones/single-standard/single-standard-02.webp",
      "/hotel/galeria/habitaciones/single-standard/single-standard-03.webp",
    ],
  },
  {
    slug: "doble-single",
    label: "Doble Twin",
    photos: [
      "/hotel/galeria/habitaciones/doble-single/doble-single-01.webp",
      "/hotel/galeria/habitaciones/doble-single/doble-single-02.webp",
      "/hotel/galeria/habitaciones/doble-single/doble-single-03.webp",
    ],
  },
  {
    slug: "doble-suite-sillas",
    label: "Suite con Sillas",
    photos: [
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-01.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-02.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-03.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-04.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-05.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillas/doble-suite-sillas-06.webp",
    ],
  },
  {
    slug: "doble-standard",
    label: "Doble Matrimonial",
    photos: [
      "/hotel/galeria/habitaciones/doble-standard/doble-standard-01.webp",
      "/hotel/galeria/habitaciones/doble-standard/doble-standard-02.webp",
    ],
  },
  {
    slug: "doble-suite-sillones",
    label: "Suite Matrimonial",
    photos: [
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-01.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-02.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-03.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-04.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-06.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-07.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-08.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-09.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-10.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-11.webp",
      "/hotel/galeria/habitaciones/doble-suite-sillones/doble-suite-sillones-12.webp",
    ],
  },
  {
    slug: "fachada",
    label: "Fachada",
    photos: [
      "/hotel/galeria/amenities/fachada/fachada-01.webp",
      "/hotel/galeria/amenities/fachada/fachada-02.webp",
      "/hotel/galeria/amenities/fachada/fachada-03.webp",
    ],
  },
  {
    slug: "desayuno",
    label: "Desayuno",
    photos: [
      "/hotel/galeria/amenities/desayuno/desayuno-01.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-02.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-03.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-04.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-05.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-06.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-07.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-08.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-09.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-10.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-11.webp",
      "/hotel/galeria/amenities/desayuno/desayuno-12.webp",
    ],
  },
  {
    slug: "home",
    label: "Lobby",
    photos: ["/hotel/galeria/amenities/home/home-01.webp"],
  },
  {
    slug: "salon",
    label: "Salón de Eventos",
    photos: [
      "/hotel/galeria/amenities/salon/salon-01.webp",
      "/hotel/galeria/amenities/salon/salon-02.webp",
      "/hotel/galeria/amenities/salon/salon-03.webp",
    ],
  },
];

export const GALLERY_IMAGES = [
  { src: "/hotel/amenities/home/home-01.webp", alt: "Lobby del hotel", span: "col-span-2 row-span-2" },
  { src: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite matrimonial" },
  { src: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/salon/salon-01.webp", alt: "Salón de eventos" },
  { src: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Habitación twin" },
  { src: "/hotel/amenities/fachada/fachada-01.webp", alt: "Fachada del hotel" },
  { src: "/hotel/habitaciones/triple-ms/triple-ms-01.webp", alt: "Habitación triple" },
  { src: "/hotel/amenities/fachada/fachada-02.webp", alt: "Fachada del hotel de noche" },
] as const;
