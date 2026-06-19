import type { LucideIcon } from 'lucide-react';

type SliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: LucideIcon;
};

const getState = (value: number) => {
  if (value >= 70) return 'success';
  if (value >= 40) return 'warning';
  return 'error';
};

const stateStyles = {
  success: {
    text: 'text-success',
    range: 'range-success',
  },
  warning: {
    text: 'text-warning',
    range: 'range-warning',
  },
  error: {
    text: 'text-error',
    range: 'range-error',
  },
} as const;

export const Slider = ({ label, value, onChange, icon: Icon }: SliderProps) => {
  const state = getState(value);

  return (
    <div className="p-3 border border-base-200 rounded-xl bg-base-200/40 space-y-2">
      {/* HEADER */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} />}
          <span>{label}</span>
        </div>

        <span className={`text-xs font-semibold ${stateStyles[state].text}`}>{value}%</span>
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`range range-xs w-full ${stateStyles[state].range}`}
      />
    </div>
  );
};
