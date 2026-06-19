import type { CSSProperties } from 'react';

interface Props {
  value: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const getTone = (value: number) => {
  if (value >= 70) return 'text-success';
  if (value >= 40) return 'text-warning';
  return 'text-error';
};

const getGlow = (value: number) => {
  if (value >= 75) return 'shadow-[0_0_15px_rgba(34,197,94,0.35)]';
  if (value >= 50) return 'shadow-[0_0_15px_rgba(245,158,11,0.25)]';
  return 'shadow-[0_0_15px_rgba(239,68,68,0.25)]';
};

const sizeClass = {
  sm: 'h-14 w-14 text-[10px]',
  md: 'h-16 w-16 text-xs',
  lg: 'h-20 w-20 text-sm',
};

const PercentRadial: React.FC<Props> = ({ value, label, size = 'md' }) => {
  const safeValue = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

  return (
    <div className="flex flex-col items-center gap-1 group">
      {/* RADIAL */}
      <div
        className={`
          radial-progress bg-base-100 font-semibold
          transition-all duration-300 ease-out
          group-hover:scale-105
          ${getTone(safeValue)}
          ${getGlow(safeValue)}
          ${sizeClass[size]}
        `}
        style={{ '--value': safeValue } as CSSProperties}
        role="progressbar"
      >
        <span className="transition-all duration-300">{safeValue}%</span>
      </div>

      {/* LABEL */}
      <p className="text-[11px] text-base-content/60 tracking-wide uppercase ">{label}</p>
    </div>
  );
};

export default PercentRadial;
