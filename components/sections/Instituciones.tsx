const fontM = "var(--font-montserrat)";

const instituciones = [
  { nombre: "Cámara Hotelera Gastronómica y Afines de Salta", logo: "/logos/instituciones/camara-hotelera-gastronomica.jpg", height: 72 },
  { nombre: "Cámara de Turismo de Salta", logo: "/logos/instituciones/camara-turismo-salta.jpg", height: 72 },
  { nombre: "Buró de Convenciones y Visitantes de Salta", logo: "/logos/instituciones/buro-convenciones-visitantes.png", height: 120 },
  { nombre: "Ministerio de Turismo y Deportes de Salta", logo: "/logos/instituciones/ministerio-turismo-salta.svg", height: 72 },
  { nombre: "Ente de Turismo de la Ciudad de Salta", logo: "/logos/instituciones/ente-turismo-ciudad-salta.png", height: 72 },
];

export default function Instituciones() {
  return (
    <section style={{ background: "#D8C2A0", padding: "48px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{
          fontFamily: fontM, fontSize: 16, letterSpacing: "0.25em", textTransform: "uppercase",
          textAlign: "center", color: "#444444", opacity: 0.6, marginBottom: 36,
        }}>
          Miembros y asociados de
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 48 }}>
          {instituciones.map((inst) => (
            inst.logo ? (
              <img
                key={inst.nombre}
                src={inst.logo}
                alt={inst.nombre}
                title={inst.nombre}
                loading="lazy"
                style={{ height: inst.height, width: "auto", objectFit: "contain", filter: "grayscale(1)", opacity: 0.65, transition: "opacity 0.2s, filter 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0)"; e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(1)"; e.currentTarget.style.opacity = "0.65"; }}
              />
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
