import React from 'react';

export interface LogoProps {
  variant?: "light" | "dark" | "gold" | "blue-bg";
  size?: number | string;
  className?: string;
}

export default function LogoPrincipal({ variant = "dark", size = 120, className = "" }: LogoProps) {
  const mainColor = variant === "light" || variant === "blue-bg" ? "#F5F1EA" : variant === "gold" ? "#d4a970" : "#0B2C57";
  const accentColor = "#d4a970";
  const badgeBg = variant === "light" || variant === "blue-bg" ? "#F5F1EA" : "#0B2C57";
  const badgeText = variant === "light" || variant === "blue-bg" ? "#0B2C57" : "#F5F1EA";
  const wText = variant === "dark" ? "#F5F1EA" : "#0B2C57";

  return (
    <svg
      width={size}
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wilson Hotel"
    >
      {/* Isotipo */}
      <circle cx="80" cy="46" r="32" fill={mainColor} />
      <circle cx="80" cy="46" r="26" fill="none" stroke={accentColor} strokeWidth="1.5" />
      <text x="80" y="58" textAnchor="middle" fill={wText} fontSize="34" fontFamily="Georgia, serif" fontWeight="700">W</text>

      {/* Texts */}
      <text x="80" y="110" textAnchor="middle" fill={mainColor} fontSize="28" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="4">WILSON</text>
      
      <line x1="30" y1="120" x2="130" y2="120" stroke={accentColor} strokeWidth="0.8" />

      <rect x="25" y="130" width="110" height="22" fill={badgeBg} rx="1" />
      <text x="80" y="145" textAnchor="middle" fill={badgeText} fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="6">HOTEL</text>

      <text x="80" y="180" textAnchor="middle" fill={accentColor} fontSize="14" fontFamily="Arial">★ ★ ★</text>
    </svg>
  );
}
