import type { ReactNode } from 'react';

type SelectableCardProps = {
  title: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  children?: ReactNode;
};

export const SelectableCard = ({
  title,
  description,
  selected = false,
  onClick,
  children,
}: SelectableCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-5 border rounded-xl text-left transition-all duration-150 cursor-pointer w-full text-left ${
      selected
        ? 'border-primary bg-primary/10 shadow-sm'
        : 'border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-content/20'
    }`}
  >
    <div className="space-y-2">
      <div className="font-semibold text-base">{title}</div>
      {description ? <div className="text-sm text-base-content/70">{description}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  </button>
);
