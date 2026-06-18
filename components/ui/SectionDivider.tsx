interface SectionDividerProps {
  light?: boolean;
  className?: string;
}

export default function SectionDivider({ light = false, className = "" }: SectionDividerProps) {
  const color = light ? "#F5F1EA" : "#d4a970";
  return (
    <div className={`flex items-center justify-center gap-3 my-2 ${className}`}>
      <div className="h-px flex-1 max-w-20" style={{ backgroundColor: color }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill={color} />
      </svg>
      <div className="h-px flex-1 max-w-20" style={{ backgroundColor: color }} />
    </div>
  );
}
