import type { ReactNode } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

type AuthModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  maxWidthClass: string;
  minHeightClass: string;
  leftPanelClassName: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  hideLeftPanel?: boolean;
};

export function AuthModalShell({
  isOpen,
  onClose,
  closeLabel,
  maxWidthClass,
  minHeightClass,
  leftPanelClassName,
  leftContent,
  rightContent,
  hideLeftPanel = false,
}: AuthModalShellProps) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div
        className={`auth-modal-shell modal-box relative overflow-hidden bg-base-100 p-0 ${maxWidthClass}`}
      >
        <button
          type="button"
          className="btn btn-ghost btn-sm absolute right-3 top-3 z-20 rounded-full bg-base-100/80 backdrop-blur hover:bg-base-100"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <IoCloseSharp className="h-5 w-5" />
        </button>

        <div
          className={`${hideLeftPanel ? 'block' : 'grid grid-cols-1 lg:grid-cols-2'} ${minHeightClass}`}
        >
          {!hideLeftPanel && <section className={leftPanelClassName}>{leftContent}</section>}
          {rightContent}
        </div>
      </div>
    </div>
  );
}
