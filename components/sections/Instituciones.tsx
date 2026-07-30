const fontM = "var(--font-montserrat)";

const instituciones = [
  { nombre: "Cámara Hotelera Gastronómica y Afines de Salta", logo: "/logos/instituciones/camara-hotelera-gastronomica.jpg" },
  { nombre: "Cámara de Turismo de Salta", logo: null },
  { nombre: "Buró de Convenciones y Visitantes de Salta", logo: null },
  { nombre: "Ministerio de Turismo y Deportes de Salta", logo: "/logos/instituciones/ministerio-turismo-salta.svg" },
  { nombre: "Ente de Turismo de la Ciudad de Salta", logo: "/logos/instituciones/ente-turismo-ciudad-salta.png" },
];

export default function Instituciones() {
  return (
    <section style={{ background: "#D8C2A0", padding: "48px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{
          fontFamily: fontM, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
          textAlign: "center", color: "#444444", opacity: 0.6, marginBottom: 28,
        }}>
          Miembro y asociado de
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 36 }}>
          {instituciones.map((inst) => (
            inst.logo ? (
              <img
                key={inst.nombre}
                src={inst.logo}
                alt={inst.nombre}
                title={inst.nombre}
                loading="lazy"
                style={{ height: 44, width: "auto", objectFit: "contain", filter: "grayscale(1)", opacity: 0.65, transition: "opacity 0.2s, filter 0.2s" }}
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
