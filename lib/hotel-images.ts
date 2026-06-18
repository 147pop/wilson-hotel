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

export const GALLERY_IMAGES = [
  { src: "/hotel/amenities/home/home-01.webp", alt: "Lobby del hotel", span: "col-span-2 row-span-2" },
  { src: "/hotel/habitaciones/doble-suite-sillones/doble-suite-sillones-05.webp", alt: "Suite matrimonial" },
  { src: "/hotel/amenities/desayuno/desayuno-01.webp", alt: "Desayuno buffet" },
  { src: "/hotel/amenities/salon/salon-01.webp", alt: "Salón de eventos" },
  { src: "/hotel/habitaciones/doble-single/doble-single-01.webp", alt: "Habitación twin" },
  { src: "/hotel/amenities/fachada/fachada-01.webp", alt: "Fachada del hotel" },
] as const;
