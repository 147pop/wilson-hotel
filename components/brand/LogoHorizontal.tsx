import React from 'react';

export interface LogoProps {
  variant?: "light" | "dark" | "gold" | "blue-bg";
  size?: number | string;
  className?: string;
}

export default function LogoHorizontal({ variant = "dark", size = 80, className = "" }: LogoProps) {
  const mainColor = variant === "light" || variant === "blue-bg" ? "#F5F1EA" : variant === "gold" ? "#d4a970" : "#0B2C57";
  const accentColor = "#d4a970";
  const badgeBg = variant === "light" || variant === "blue-bg" ? "#F5F1EA" : "#0B2C57";
  const badgeText = variant === "light" || variant === "blue-bg" ? "#0B2C57" : "#F5F1EA";
  const wText = variant === "dark" ? "#F5F1EA" : "#0B2C57";

  return (
    <svg
      height={size}
      viewBox="0 0 220 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wilson Hotel"
    >
      <circle cx="32" cy="40" r="28" fill={mainColor} />
      <circle cx="32" cy="40" r="23" fill="none" stroke={accentColor} strokeWidth="1.5" />
      <text x="32" y="51" textAnchor="middle" fill={wText} fontSize="30" fontFamily="Georgia, serif" fontWeight="700">W</text>

      <text x="75" y="32" fill={mainColor} fontSize="26" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="3">WILSON</text>

      <rect x="75" y="42" width="130" height="20" fill={badgeBg} rx="1" />
      <text x="140" y="56" textAnchor="middle" fill={badgeText} fontSize="11" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="5">HOTEL</text>

      <text x="140" y="75" textAnchor="middle" fill={accentColor} fontSize="10" fontFamily="Arial">★ ★ ★</text>

      <line x1="75" y1="38" x2="205" y2="38" stroke={accentColor} strokeWidth="0.8" />
    </svg>
  );
}
