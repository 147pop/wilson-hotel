interface SocialProofProps {
  variant?: "light" | "dark" | "sand";
  score?: number;
  reviews?: number;
  label?: string;
  year?: number;
}

import Image from "next/image";

const fontG = "var(--font-garamond)";
const fontM = "var(--font-montserrat)";

function CardWrapper({ children, background, boxShadow, border }: {
  children: React.ReactNode;
  background: string;
  boxShadow: string;
  border?: string;
}) {
  return (
    <div
      className="card-shimmer relative overflow-hidden flex flex-col w-full min-h-full"
      style={{
        background,
        boxShadow,
        fontFamily: fontM,
        ...(border ? { border } : {}),
      }}
    >
      {children}
    </div>
  );
}

function CardBody({
  score,
  maxScore,
  scoreColor,
  label,
  labelColor,
  reviews,
  reviewsText,
}: {
  score: number;
  maxScore: string;
  scoreColor: string;
  label: string;
  labelColor: string;
  reviews?: number;
  reviewsText: string;
}) {
  return (
    <>
      <div style={{ padding: "14px 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 46, color: scoreColor, fontFamily: fontG, lineHeight: 1 }}>
            {score.toFixed(1).replace(".", ",")}
          </span>
          <span style={{ fontSize: 13, color: scoreColor, opacity: 0.4, paddingBottom: 6 }}>{maxScore}</span>
        </div>
        <div style={{ fontSize: 13, color: labelColor, fontWeight: 600, marginBottom: 5 }}>
          {label}
        </div>
        <div style={{ fontSize: 10, color: "inherit", opacity: 0.45, letterSpacing: "0.04em" }}>
          {reviews != null ? `Basado en ${reviews.toLocaleString("es-AR")} reseñas` : reviewsText}
        </div>
      </div>
    </>
  );
}

function BookingScoreCard({ score, reviews, label }: {
  score: number; reviews: number; label: string;
}) {
  return (
    <CardWrapper
      background="linear-gradient(150deg, #003580 0%, #001F4D 100%)"
      boxShadow="0 6px 24px rgba(0,53,128,0.3)"
    >
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
          <text x="0" y="14" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="700">
            <tspan fill="white">booking</tspan><tspan fill="#7FBAFF">.com</tspan>
          </text>
        </svg>
      </div>
      <CardBody score={score} maxScore="/10" scoreColor="white" label={label} labelColor="#7FBAFF" reviews={reviews} reviewsText="" />
    </CardWrapper>
  );
}

function DespegarScoreCard({ score, label }: { score: number; label: string }) {
  const PRIMARY = "#6600CC";
  const DARK = "#430085";
  const LIGHT_PURPLE = "#C084FC";

  return (
    <CardWrapper
      background={`linear-gradient(150deg, ${PRIMARY} 0%, ${DARK} 100%)`}
      boxShadow="0 6px 24px rgba(102,0,204,0.3)"
    >
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <ellipse cx="7.5" cy="10" rx="7.5" ry="10" fill="rgba(255,255,255,0.28)" />
            <ellipse cx="14.5" cy="10" rx="7.5" ry="10" fill="rgba(255,255,255,0.65)" />
          </svg>
          <svg width="104" height="16" viewBox="0 0 104 16" fill="none" preserveAspectRatio="xMinYMid meet">
            <text x="0" y="13" fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700">despegar.com</text>
          </svg>
        </div>
      </div>
      <CardBody score={score} maxScore="/10" scoreColor="white" label={label} labelColor={LIGHT_PURPLE} reviews={undefined} reviewsText="Basado en 150 reseñas" />
    </CardWrapper>
  );
}

function TripAdvisorScoreCard({ score, label }: { score: number; label: string }) {
  const TRIP_GREEN = "#34E0A1";

  return (
    <CardWrapper
      background="linear-gradient(150deg, #141414 0%, #000000 100%)"
      boxShadow="0 6px 24px rgba(0,0,0,0.35)"
    >
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            src="/logos/tripadvisor.jpg"
            alt="Tripadvisor"
            width={26}
            height={26}
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
      <CardBody score={score} maxScore="/4" scoreColor="white" label={label} labelColor={TRIP_GREEN} reviews={undefined} reviewsText="Basado en 273 reseñas" />
    </CardWrapper>
  );
}

function GoogleScoreCard({ score, reviews, label }: { score: number; reviews: number; label: string }) {
  return (
    <CardWrapper
      background="linear-gradient(150deg, #ffffff 0%, #f1f3f4 100%)"
      boxShadow="0 6px 24px rgba(0,0,0,0.12)"
      border="1px solid rgba(0,0,0,0.06)"
    >
      <div style={{ padding: "13px 16px 10px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <svg width="70" height="20" viewBox="0 0 74 24" fill="none">
          <text x="0" y="18" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="700">
            <tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC05">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan>
          </text>
        </svg>
      </div>
      <CardBody score={score} maxScore="/5" scoreColor="#202124" label={label} labelColor="#188038" reviews={reviews} reviewsText="" />
    </CardWrapper>
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
  const labelColor = isDark ? goldColor : "var(--blue-muted)";

  return (
    <section className="px-6 py-16 sm:px-10 md:px-16" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto">
        {/* Text block centered */}
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <h2
            className="reveal reveal-d1"
            style={{
              fontFamily: fontG,
              fontSize: "clamp(28px, 3.5vw, 46px)",
              color: titleColor,
              margin: "0 0 16px 0",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}>
            Lo que dicen nuestros{" "}
            <em style={{ color: labelColor }}>huéspedes</em>
          </h2>

          <p
            className="reveal reveal-d2 sm:text-base"
            style={{
              fontFamily: fontM,
              fontSize: 13,
              color: subtitleColor,
              lineHeight: 1.75,
              margin: 0,
              opacity: isDark ? 0.82 : 0.88,
            }}>
            Wilson Hotel recibe calificaciones sobresalientes en las
            principales plataformas de viaje. Nuestros huéspedes
            valoran la atención personalizada, la ubicación céntrica
            y la relación calidad-precio.
          </p>
        </div>

        {/* Responsive card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          <div className="reveal reveal-d1">
            <GoogleScoreCard score={4.2} reviews={1473} label="Muy bueno" />
          </div>
          <div className="reveal reveal-d2">
            <BookingScoreCard score={score} reviews={reviews} label={label} />
          </div>
          <div className="reveal reveal-d3">
            <DespegarScoreCard score={8.1} label="Muy bueno" />
          </div>
          <div className="reveal reveal-d4">
            <TripAdvisorScoreCard score={3.8} label="Excelente" />
          </div>
        </div>
      </div>
    </section>
  );
}