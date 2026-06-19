import Image from 'next/image';

interface LogoProps {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: 50, md: 70, lg: 100 };

const filters: Record<string, string> = {
  dark: '',
  light: 'brightness(0) invert(1)',
  gold: 'brightness(0) invert(1) sepia(1) saturate(4) brightness(0.82)',
};

export default function Logo({ variant = "dark", size = "md", className = "" }: LogoProps) {
  const h = sizeMap[size];
  const filter = filters[variant] ?? '';

  return (
    <div
      className={className}
      style={{ height: h, overflow: 'hidden', display: 'inline-flex', alignItems: 'center' }}
      aria-label="Wilson Hotel"
    >
      <Image
        src="/logos/logohotel/finales%20png/logo2.png"
        alt="Wilson Hotel"
        width={500}
        height={500}
        style={{ width: h * 2.2, height: 'auto', display: 'block', ...(filter ? { filter } : {}) }}
      />
    </div>
  );
}
