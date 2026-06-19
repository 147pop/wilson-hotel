"use client";
import Link from "next/link";
import LogoPrincipal from "@/components/brand/LogoPrincipal";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import LogoIsotipo from "@/components/brand/LogoIsotipo";

const g = {
  deep: "#0B2C57", ivory: "#F5F1EA", gold: "#d4a970",
  sand: "#D8C2A0", blue: "#123E7A",
  fontG: "var(--font-garamond)", fontM: "var(--font-montserrat)",
};

const variants = [
  {
    href: "/variante-a",
    label: "variante a",
    concept: "Grand Hôtel Editorial",
    tagline: "Revista de lujo · Marfil dominante",
    description: "Navbar centrado con logo en el medio. Hero asimétrico con gran tipografía y collage angular de fotos. Habitaciones como ensayo fotográfico alternado (01–05). Sección de tarifas en navy. CTA gold dramático.",
    palette: [{ hex: "#F5F1EA", name: "Marfil" }, { hex: "#0B2C57", name: "Navy" }, { hex: "#d4a970", name: "Gold" }],
    feel: "Condé Nast · Architectural Digest · Argentina",
    preview: "linear-gradient(135deg, #F5F1EA 60%, #D8C2A0 100%)",
    textPreview: "#0B2C57",
  },
  {
    href: "/variante-b",
    label: "variante b",
    concept: "Contraste Arquitectónico",
    tagline: "Navy ↔ Marfil · Modular · Estructurado",
    description: "Hero dividido: navy oscuro izquierda con tipografía grande + estadísticas, foto full-height derecha. Secciones dramáticamente alternadas dark/light. Habitaciones como cards con foto full-bleed y overlay. Servicios con alternancia zigzag.",
    palette: [{ hex: "#0B2C57", name: "Navy" }, { hex: "#F5F1EA", name: "Marfil" }, { hex: "#D8C2A0", name: "Arena" }],
    feel: "Modernismo suizo · Swiss Grid · Arquitectura argentina",
    preview: "linear-gradient(135deg, #0B2C57 50%, #F5F1EA 50%)",
    textPreview: "#F5F1EA",
  },
  {
    href: "/variante-c",
    label: "variante c",
    concept: "La Madrugada",
    tagline: "Full dark · Gold como luz · Cinematic",
    description: "Todo fondo azul profundo. Hero con foto diagonal clip-path, tipografía enorme. Habitaciones como cards horizontales apilados. Galería con fotos cortadas en ángulo. CTA dramático con glow de oro. Mapa invertido (dark).",
    palette: [{ hex: "#0B2C57", name: "Deep navy" }, { hex: "#d4a970", name: "Gold" }, { hex: "#D8C2A0", name: "Arena" }],
    feel: "Boutique hotel · Patagonia lodge · Cinematic luxury",
    preview: "linear-gradient(135deg, #091f40 0%, #0B2C57 100%)",
    textPreview: "#F5F1EA",
  },
];

export default function IndexPage() {
  return (
    <main style={{ minHeight: "100vh", background: g.ivory, color: g.deep }}>
      {/* Header */}
      <header className="px-5 py-10 sm:px-10 sm:py-12 text-center" style={{ background: g.deep, borderBottom: `3px solid ${g.gold}` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <LogoPrincipal variant="light" size={120} />
        </div>
        <p style={{ fontFamily: g.fontM, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: g.sand, opacity: 0.6, margin: 0 }}>
          Tres propuestas de landing page · Seleccionar variante
        </p>
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-12 sm:px-10 sm:py-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {variants.map((v) => (
          <Link key={v.href} href={v.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ border: `1px solid ${g.sand}`, background: "white", overflow: "hidden", transition: "all 0.3s ease", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = g.gold; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px rgba(11,44,87,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = g.sand; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>

              {/* Color preview */}
              <div style={{ height: 140, background: v.preview, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: g.fontG, fontSize: 72, fontWeight: 700, color: v.textPreview, opacity: 0.15, userSelect: "none" }}>{v.label}</span>
                <span style={{ position: "absolute", fontFamily: g.fontG, fontSize: 32, fontWeight: 600, color: v.textPreview === g.ivory ? "rgba(245,241,234,0.9)" : "rgba(11,44,87,0.7)" }}>{v.label}</span>
              </div>

              {/* Palette dots */}
              <div style={{ display: "flex", gap: 8, padding: "16px 20px 0" }}>
                {v.palette.map(c => (
                  <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: c.hex, border: `1px solid rgba(0,0,0,0.1)` }} />
                    <span style={{ fontFamily: g.fontM, fontSize: 8, color: g.deep, opacity: 0.4, letterSpacing: "0.05em" }}>{c.name}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: "16px 20px 24px" }}>
                <h2 style={{ fontFamily: g.fontG, fontSize: 22, color: g.deep, margin: "0 0 4px 0" }}>{v.label}</h2>
                <p style={{ fontFamily: g.fontM, fontSize: 9, color: g.gold, letterSpacing: "0.1em", margin: "0 0 12px 0", textTransform: "uppercase", opacity: 0.8 }}>{v.tagline}</p>
                <p style={{ fontFamily: g.fontM, fontSize: 11, color: g.deep, opacity: 0.6, lineHeight: 1.65, margin: "0 0 14px 0" }}>{v.description}</p>
                <p style={{ fontFamily: g.fontM, fontSize: 9, color: g.deep, opacity: 0.35, fontStyle: "italic", margin: "0 0 16px 0" }}>{v.feel}</p>
                <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: g.gold }}>Ver variante →</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ── SISTEMA DE LOGO ── Brandbook showcase */}
      <section style={{
        background: g.deep,
        padding: "80px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative background text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: g.fontG, fontSize: "18vw", color: "rgba(245,241,234,0.02)",
          letterSpacing: "0.3em", whiteSpace: "nowrap", pointerEvents: "none", fontWeight: 700, userSelect: "none",
        }}>WILSON</div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 48, background: g.gold, opacity: 0.4 }} />
              <span style={{ fontFamily: g.fontM, fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: g.gold }}>Identidad visual</span>
              <div style={{ height: 1, width: 48, background: g.gold, opacity: 0.4 }} />
            </div>
            <h2 style={{ fontFamily: g.fontG, fontSize: "clamp(32px, 4vw, 52px)", color: g.ivory, margin: "0 0 12px 0", lineHeight: 0.95, letterSpacing: "-0.01em" }}>
              Sistema de Logo
            </h2>
            <p style={{ fontFamily: g.fontM, fontSize: 11, color: g.sand, opacity: 0.55, margin: 0, letterSpacing: "0.05em" }}>
              Variantes oficiales para garantizar consistencia y correcta aplicación de la marca
            </p>
          </div>

          {/* Logo showcase grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* 1. Logo Principal */}
            <div style={{
              background: "rgba(245,241,234,0.04)",
              border: "1px solid rgba(245,241,234,0.08)",
              padding: "40px 24px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.07)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,169,112,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,241,234,0.08)";
              }}
            >
              <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, opacity: 0.8 }}>1. Logo principal</span>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LogoPrincipal variant="light" size={120} />
              </div>
              <p style={{ fontFamily: g.fontM, fontSize: 9, color: g.sand, opacity: 0.45, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
                Uso institucional y principal.<br />Composición vertical completa.
              </p>
            </div>

            {/* 2. Versión Horizontal */}
            <div style={{
              background: "rgba(245,241,234,0.04)",
              border: "1px solid rgba(245,241,234,0.08)",
              padding: "40px 32px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.07)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,169,112,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,241,234,0.08)";
              }}
            >
              <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, opacity: 0.8 }}>2. Versión horizontal</span>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <LogoHorizontal variant="light" size={52} />
              </div>
              {/* Versión sobre fondo azul */}
              <div style={{
                background: g.blue,
                padding: "20px 32px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}>
                <LogoHorizontal variant="blue-bg" size={40} />
              </div>
              <p style={{ fontFamily: g.fontM, fontSize: 9, color: g.sand, opacity: 0.45, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
                Para headers, banners y usos horizontales.<br />Incluye versión sobre fondo institucional.
              </p>
            </div>

            {/* 3. Isotipo / Versión reducida */}
            <div style={{
              background: "rgba(245,241,234,0.04)",
              border: "1px solid rgba(245,241,234,0.08)",
              padding: "40px 24px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.07)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,169,112,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(245,241,234,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,241,234,0.08)";
              }}
            >
              <span style={{ fontFamily: g.fontM, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: g.gold, opacity: 0.8 }}>3. Versión reducida / isotipo</span>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LogoIsotipo variant="light" size={90} />
              </div>
              <p style={{ fontFamily: g.fontM, fontSize: 9, color: g.sand, opacity: 0.45, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
                Uso en redes sociales, favicon<br />y espacios reducidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: g.deep, padding: "24px 40px", textAlign: "center", borderTop: `1px solid rgba(212,169,112,0.15)` }}>
        <p style={{ fontFamily: g.fontM, fontSize: 10, color: g.sand, opacity: 0.35, margin: 0 }}>
          Wilson Hotel · Alvarado 950, Salta · info@wilsonhotel.com.ar
        </p>
      </footer>
    </main>
  );
}
