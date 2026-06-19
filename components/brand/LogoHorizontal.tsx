import Image from 'next/image';

export interface LogoProps {
  variant?: "light" | "dark" | "gold" | "blue-bg";
  size?: number | string;
  className?: string;
}

const filters: Record<string, string> = {
  dark: '',
  light: 'brightness(0) invert(1)',
  'blue-bg': 'brightness(0) invert(1)',
  gold: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(-10deg) brightness(0.85)',
};

export default function LogoHorizontal({ variant = "dark", size = 80, className = "" }: LogoProps) {
  const h = typeof size === 'number' ? size : parseInt(size as string) || 80;
  const filter = filters[variant] ?? '';

  return (
    <div
      className={className}
      style={{ height: h, overflow: 'hidden', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}
      aria-label="Wilson Hotel"
    >
      <Image
        src="/logos/logohotel/finales%20png/logo2v2.png"
        alt="Wilson Hotel"
        width={500}
        height={500}
        style={{ width: h * 2.2, height: 'auto', display: 'block', ...(filter ? { filter } : {}) }}
      />
    </div>
  );
}
