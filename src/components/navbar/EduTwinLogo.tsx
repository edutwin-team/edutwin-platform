import { useId } from 'react';

type EduTwinLogoProps = {
  className?: string;
};

export function EduTwinLogo({ className }: EduTwinLogoProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 210 56"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo EduTwin"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--logo-grad-start)" />
          <stop offset="100%" stopColor="var(--logo-grad-end)" />
        </linearGradient>
      </defs>

      <rect x="0" y="4" width="48" height="48" rx="13" fill={`url(#${gradientId})`} />
      <rect
        x="6"
        y="10"
        width="48"
        height="48"
        rx="13"
        fill="var(--logo-icon-shadow)"
        opacity="0.35"
      />

      <circle cx="17" cy="28" r="6.5" fill="white" opacity="0.95" />
      <circle cx="37" cy="28" r="6.5" fill="white" opacity="0.95" />
      <line
        x1="23.5"
        y1="28"
        x2="30.5"
        y2="28"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="2.5,2"
        opacity="0.85"
      />

      <line x1="17" y1="21.5" x2="17" y2="16" stroke="white" strokeWidth="1.8" opacity="0.55" />
      <line x1="17" y1="34.5" x2="17" y2="40" stroke="white" strokeWidth="1.8" opacity="0.55" />
      <line x1="10.5" y1="28" x2="5" y2="28" stroke="white" strokeWidth="1.8" opacity="0.55" />
      <line x1="37" y1="21.5" x2="37" y2="16" stroke="white" strokeWidth="1.8" opacity="0.55" />
      <line x1="37" y1="34.5" x2="37" y2="40" stroke="white" strokeWidth="1.8" opacity="0.55" />
      <line x1="43.5" y1="28" x2="49" y2="28" stroke="white" strokeWidth="1.8" opacity="0.55" />

      <text
        x="62"
        y="33"
        fontFamily="'Inter', sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="var(--logo-text-primary)"
        letterSpacing="-0.5"
      >
        Edu
      </text>
      <text
        x="97"
        y="33"
        fontFamily="'Inter', sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={`url(#${gradientId})`}
        letterSpacing="-0.5"
      >
        Twin
      </text>

      <text
        x="63"
        y="46"
        fontFamily="'Inter', sans-serif"
        fontWeight="400"
        fontSize="8"
        fill="var(--logo-text-muted)"
        letterSpacing="2"
      >
        PLATEFORME ÉDUCATIVE · IA
      </text>
    </svg>
  );
}
