type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Inscription</h3>

        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="Nom" className="input  w-full" />
            <input type="text" placeholder="Prénom" className="input  w-full" />
          </div>

          <input type="email" placeholder="Email" className="input  w-full" />

          <input type="password" placeholder="Mot de passe" className="input  w-full" />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="input  w-full"
          />

          <button className="btn btn-primary w-full mt-4">S'inscrire</button>
        </form>

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Fermer
          </button>
        </div>
      </div>

      {/* Backdrop click */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};
