import type { ReactNode } from 'react';
import { X } from 'lucide-react';

type GenericModalProps = {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  children: ReactNode;

  onConfirm?: () => void;

  confirmText?: string;
  cancelText?: string;

  confirmColor?: 'primary' | 'error' | 'success' | 'warning' | 'info';

  loading?: boolean;
};

export const GenericModal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmColor = 'primary',
  loading = false,
}: GenericModalProps) => {
  if (!isOpen) return null;

  const confirmButtonStyles = {
    primary: 'btn-primary',
    error: 'btn-error',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
  };

  return (
    <dialog className="modal modal-open">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 " onClick={onClose} />

      {/* Modal */}
      <div className="modal-box relative max-w-lg rounded-3xl border border-base-300 bg-base-100 shadow-2xl p-0 overflow-hidden">
        {/* Top gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <h3 className="text-xl font-bold text-base-content">{title}</h3>

            <p className="text-sm text-base-content/60 mt-1">Confirmation requise</p>
          </div>

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost hover:bg-base-200">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-base-content/80 leading-relaxed">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="btn btn-ghost rounded-xl">
            {cancelText}
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`btn rounded-xl text-white ${confirmButtonStyles[confirmColor]}`}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Chargement...
                </>
              ) : (
                confirmText
              )}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};
