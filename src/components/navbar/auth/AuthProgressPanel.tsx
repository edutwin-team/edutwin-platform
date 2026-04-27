import { HiCheckCircle } from 'react-icons/hi';

type AuthProgressPanelProps = {
  steps: readonly string[];
  currentStep: number;
  progressValue: number;
  className?: string;
};

export function AuthProgressPanel({
  steps,
  currentStep,
  progressValue,
  className = 'space-y-3',
}: AuthProgressPanelProps) {
  return (
    <div className={`auth-side-glass-card rounded-2xl p-4 backdrop-blur-sm ${className}`}>
      <p className="text-sm font-semibold">Votre progression</p>
      <ul className="space-y-2 text-sm text-white/85">
        {steps.map((label, index) => (
          <li key={label} className="flex items-center gap-2">
            <HiCheckCircle
              className={currentStep >= index + 1 ? 'text-success' : 'text-white/50'}
            />
            {label}
          </li>
        ))}
      </ul>
      <progress className="progress progress-success w-full" value={progressValue} max={100} />
    </div>
  );
}
