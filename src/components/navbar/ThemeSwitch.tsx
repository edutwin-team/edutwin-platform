import { HiMoon, HiSun } from 'react-icons/hi';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeSwitch({ isDark, onToggle }: ThemeSwitchProps) {
  const trackClass = isDark ? 'theme-switch-track-on' : 'theme-switch-track-off';

  return (
    <label className="relative mr-2 flex h-8 w-14 cursor-pointer items-center">
      <span
        className={`pointer-events-none absolute left-2 z-10 transition-opacity ${
          isDark ? 'opacity-45' : 'opacity-100'
        }`}
      >
        <HiSun className="theme-switch-sun h-3.5 w-3.5" />
      </span>
      <span
        className={`pointer-events-none absolute right-2 z-10 transition-opacity ${
          isDark ? 'opacity-100' : 'opacity-45'
        }`}
      >
        <HiMoon className="theme-switch-moon h-3.5 w-3.5" />
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-colors duration-200 ease-out ${trackClass}`}
      />
      <span
        aria-hidden="true"
        className={`theme-switch-thumb absolute top-[2px] z-20 h-7 w-7 rounded-full transition-transform duration-200 ease-out ${
          isDark ? 'translate-x-[26px]' : 'translate-x-0.5'
        }`}
      />
      <input
        type="checkbox"
        className="absolute inset-0 z-30 cursor-pointer appearance-none opacity-0"
        checked={isDark}
        onChange={onToggle}
        aria-label="Activer le mode sombre"
      />
    </label>
  );
}
