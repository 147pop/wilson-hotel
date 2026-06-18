interface LogoProps {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "dark", size = "md", className = "" }: LogoProps) {
  const mainColor = variant === "light" ? "#F5F1EA" : variant === "gold" ? "#d4a970" : "#0B2C57";
  const accentColor = variant === "light" ? "#d4a970" : "#d4a970";
  const starColor = variant === "light" ? "#F5F1EA" : "#0B2C57";
  const badgeBg = variant === "light" ? "#F5F1EA" : "#0B2C57";
  const badgeText = variant === "light" ? "#0B2C57" : "#F5F1EA";

  const sizeMap = {
    sm: { width: 120, height: 60 },
    md: { width: 160, height: 80 },
    lg: { width: 220, height: 110 },
  };

  const { width, height } = sizeMap[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wilson Hotel"
    >
      {/* Isotipo circular */}
      <circle cx="32" cy="32" r="28" fill={mainColor} />
      <circle cx="32" cy="32" r="23" fill="none" stroke={accentColor} strokeWidth="1.5" />
      {/* W letter */}
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fill={variant === "dark" ? "#F5F1EA" : "#0B2C57"}
        fontSize="30"
        fontFamily="Georgia, serif"
        fontWeight="700"
      >
        W
      </text>

      {/* WILSON text */}
      <text
        x="75"
        y="22"
        fill={mainColor}
        fontSize="26"
        fontFamily="Georgia, serif"
        fontWeight="700"
        letterSpacing="3"
      >
        WILSON
      </text>

      {/* HOTEL badge */}
      <rect x="75" y="32" width="130" height="20" fill={badgeBg} rx="1" />
      <text
        x="140"
        y="46"
        textAnchor="middle"
        fill={badgeText}
        fontSize="11"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        letterSpacing="5"
      >
        HOTEL
      </text>
      {/* Stars */}
      <text x="116" y="61" fill={accentColor} fontSize="10" fontFamily="Arial">
        ★ ★ ★
      </text>

      {/* Horizontal line accent */}
      <line x1="75" y1="28" x2="205" y2="28" stroke={accentColor} strokeWidth="0.8" />
    </svg>
  );
}
