interface SocialProofProps {
  variant?: "light" | "dark" | "sand";
  score?: number;
  reviews?: number;
  label?: string;
  year?: number;
}

const fontG = "var(--font-garamond)";
const fontM = "var(--font-montserrat)";

function BookingScoreCard({ score, reviews, label }: {
  score: number; reviews: number; label: string;
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: 210,
      background: "linear-gradient(150deg, #003580 0%, #001F4D 100%)",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 6px 24px rgba(0,53,128,0.3)",
      fontFamily: fontM,
    }}>
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
          <text x="0" y="14" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="700">
            <tspan fill="white">booking</tspan><tspan fill="#7FBAFF">.com</tspan>
          </text>
        </svg>
      </div>
      <div style={{ padding: "14px 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 46, color: "white", fontFamily: fontG, lineHeight: 1 }}>
            {score.toFixed(1).replace(".", ",")}
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", paddingBottom: 6 }}>/10</span>
        </div>
        <div style={{ fontSize: 13, color: "#7FBAFF", fontWeight: 600, marginBottom: 5 }}>
          {label}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
          Basado en {reviews.toLocaleString("es-AR")} reseñas
        </div>
      </div>
    </div>
  );
}

function DespegarScoreCard({ score, label }: { score: number; label: string }) {
  const PRIMARY = "#6600CC";
  const DARK = "#430085";
  const LIGHT_PURPLE = "#C084FC";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: 210,
      background: `linear-gradient(150deg, ${PRIMARY} 0%, ${DARK} 100%)`,
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 6px 24px rgba(102,0,204,0.3)",
      fontFamily: fontM,
    }}>
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <ellipse cx="7.5" cy="10" rx="7.5" ry="10" fill="rgba(255,255,255,0.28)" />
            <ellipse cx="14.5" cy="10" rx="7.5" ry="10" fill="rgba(255,255,255,0.65)" />
          </svg>
          <svg width="88" height="16" viewBox="0 0 88 16" fill="none">
            <text x="0" y="13" fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700">despegar.com</text>
          </svg>
        </div>
      </div>
      <div style={{ padding: "14px 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 46, color: "white", fontFamily: fontG, lineHeight: 1 }}>
            {score.toFixed(1).replace(".", ",")}
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", paddingBottom: 6 }}>/10</span>
        </div>
        <div style={{ fontSize: 13, color: LIGHT_PURPLE, fontWeight: 600, marginBottom: 5 }}>
          {label}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
          Basado en 150 reseñas
        </div>
      </div>
    </div>
  );
}

function TripAdvisorScoreCard({ score, label }: { score: number; label: string }) {
  const TRIP_GREEN = "#34E0A1";
  const denominator = 4;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: 210,
      background: "linear-gradient(150deg, #141414 0%, #000000 100%)",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
      fontFamily: fontM,
    }}>
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/logos/tripadvisor.jpg"
            alt="Tripadvisor"
            style={{
              width: 26,
              height: 26,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "50%",
            }}
          />
          <svg width="78" height="16" viewBox="0 0 78 16" fill="none">
            <text x="0" y="13" fill="white" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="700">Tripadvisor</text>
          </svg>
        </div>
      </div>
      <div style={{ padding: "14px 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 46, color: "white", fontFamily: fontG, lineHeight: 1 }}>
            {score.toFixed(1).replace(".", ",")}
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", paddingBottom: 6 }}>/4</span>
        </div>
        <div style={{ fontSize: 13, color: TRIP_GREEN, fontWeight: 600, marginBottom: 5 }}>
          {label}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
          Basado en 273 reseñas
        </div>
      </div>
    </div>
  );
}

export default function SocialProof({
  variant = "light",
  score = 8.6,
  reviews = 479,
  label = "Muy bien",
}: SocialProofProps) {
  const isDark = variant === "dark";
  const isSand = variant === "sand";

  const bg = isDark ? "#091f40" : isSand ? "#D8C2A0" : "#F5F1EA";
  const titleColor = isDark ? "#F5F1EA" : "#0B2C57";
  const subtitleColor = isDark ? "#D8C2A0" : "#444444";
  const goldColor = "#d4a970";

  return (
    <section style={{ background: bg, padding: "72px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Text block centered */}
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ height: 1, width: 28, background: goldColor, opacity: 0.5 }} />
            <span style={{
              fontFamily: fontM,
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: goldColor,
            }}>
              Opiniones verificadas
            </span>
            <div style={{ height: 1, width: 28, background: goldColor, opacity: 0.5 }} />
          </div>

          <h2 style={{
            fontFamily: fontG,
            fontSize: "clamp(28px, 3.5vw, 46px)",
            color: titleColor,
            margin: "0 0 16px 0",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textWrap: "balance",
          } as React.CSSProperties}>
            Lo que dicen nuestros{" "}
            <em style={{ color: goldColor }}>huéspedes</em>
          </h2>

          <p style={{
            fontFamily: fontM,
            fontSize: 13,
            color: subtitleColor,
            lineHeight: 1.75,
            margin: 0,
            opacity: isDark ? 0.75 : 0.7,
          }}>
            Wilson Hotel recibe calificaciones sobresalientes en las
            principales plataformas de viaje. Nuestros huéspedes
            valoran la atención personalizada, la ubicación céntrica
            y la relación calidad-precio.
          </p>
        </div>

        {/* Three cards in a horizontal row */}
        <div style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <BookingScoreCard score={score} reviews={reviews} label={label} />
          <DespegarScoreCard score={8.1} label="Muy bueno" />
          <TripAdvisorScoreCard score={3.8} label="Excelente" />
        </div>
      </div>
    </section>
  );
}
