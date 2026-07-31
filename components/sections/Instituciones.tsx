import Image from "next/image";

const fontM = "var(--font-montserrat)";

const instituciones = [
  { nombre: "Cámara Hotelera Gastronómica y Afines de Salta", logo: "/logos/instituciones/camara-hotelera-gastronomica.jpg", height: 56 },
  { nombre: "Cámara de Turismo de Salta", logo: "/logos/instituciones/camara-turismo-salta.jpg", height: 56 },
  { nombre: "Buró de Convenciones y Visitantes de Salta", logo: "/logos/instituciones/buro-convenciones-visitantes.png", height: 72 },
  { nombre: "Ministerio de Turismo y Deportes de Salta", logo: "/logos/instituciones/ministerio-turismo-salta.svg", height: 56 },
  { nombre: "Ente de Turismo de la Ciudad de Salta", logo: "/logos/instituciones/ente-turismo-ciudad-salta.png", height: 56 },
];

export default function Instituciones() {
  return (
    <section className="px-6 py-12 sm:px-10 md:py-16" style={{ background: "#D8C2A0" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-center mb-8 sm:mb-10"
          style={{
            fontFamily: fontM,
            fontSize: "clamp(11px, 2.5vw, 14px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#444444",
            opacity: 0.6,
          }}>
          Miembros y asociados de
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
          {instituciones.map((inst) => (
            inst.logo ? (
              <div
                key={inst.nombre}
                className="relative flex items-center justify-center"
                style={{ height: inst.height, width: "auto" }}
                title={inst.nombre}
              >
                <Image
                  src={inst.logo}
                  alt={inst.nombre}
                  width={120}
                  height={inst.height}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    filter: "grayscale(1)",
                    opacity: 0.65,
                    transition: "opacity 0.2s, filter 0.2s",
                  }}
                  className="hover:!opacity-100 hover:!grayscale-0 transition-all duration-200"
                />
              </div>
            ) : (
              <span
                key={inst.nombre}
                title={inst.nombre}
                style={{ fontFamily: fontM, fontSize: 11, letterSpacing: "0.04em", color: "#0B2C57", opacity: 0.55, maxWidth: 160, textAlign: "center", lineHeight: 1.4 }}
              >
                {inst.nombre}
              </span>
            )
          ))}
        </div>
      </div>
    </section>
  );
}