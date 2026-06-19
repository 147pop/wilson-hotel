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
  gold: 'brightness(0) invert(1) sepia(1) saturate(4) brightness(0.82)',
};

export default function LogoIsotipo({ variant = "dark", size = 80, className = "" }: LogoProps) {
  const h = typeof size === 'number' ? size : parseInt(size as string) || 80;
  const filter = filters[variant] ?? '';

  return (
    <Image
      src="/logos/logohotel/finales%20png/logostars.png"
      alt="Wilson Hotel"
      width={140}
      height={186}
      className={className}
      style={{ height: h, width: 'auto', display: 'inline-block', ...(filter ? { filter } : {}) }}
    />
  );
}
