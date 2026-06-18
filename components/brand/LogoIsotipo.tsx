import React from 'react';

export interface LogoProps {
  variant?: "light" | "dark" | "gold" | "blue-bg";
  size?: number | string;
  className?: string;
}

export default function LogoIsotipo({ variant = "dark", size = 80, className = "" }: LogoProps) {
  const mainColor = variant === "light" || variant === "blue-bg" ? "#F5F1EA" : variant === "gold" ? "#d4a970" : "#0B2C57";
  const accentColor = "#d4a970";
  const wText = variant === "dark" ? "#F5F1EA" : "#0B2C57";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wilson Hotel"
    >
      <circle cx="40" cy="40" r="36" fill={mainColor} />
      <circle cx="40" cy="40" r="30" fill="none" stroke={accentColor} strokeWidth="2" />
      <text x="40" y="53" textAnchor="middle" fill={wText} fontSize="40" fontFamily="Georgia, serif" fontWeight="700">W</text>
    </svg>
  );
}
