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

export default function LogoPrincipal({ variant = "dark", size = 160, className = "" }: LogoProps) {
  const w = typeof size === 'number' ? size : parseInt(size as string) || 160;
  const filter = filters[variant] ?? '';

  return (
    <Image
      src="/logos/logohotel/finales%20png/logo1.png"
      alt="Wilson Hotel"
      width={475}
      height={354}
      className={className}
      style={{ width: w, height: 'auto', display: 'inline-block', ...(filter ? { filter } : {}) }}
    />
  );
}
