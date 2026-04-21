import { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineMail,
} from 'react-icons/hi';
import { AuthModalShell } from '../../auth/AuthModalShell';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SUCCESS_FEEDBACK_CLASS = 'text-sm font-medium text-success';

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    onClose();
  };
  return (
    <AuthModalShell
      isOpen={isOpen}
      onClose={handleClose}
      closeLabel="Fermer l'inscription"
      maxWidthClass="max-w-4xl"
      minHeightClass="min-h-[520px]"
      leftPanelClassName="auth-modal-side-register hidden lg:flex flex-col justify-between gap-8 p-10 text-white"
      leftContent={
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">EduTwin Platform</p>
            <h3 className="text-4xl font-bold leading-tight">Inscription</h3>
            <p className="max-w-xs text-sm text-white/85">
              Configurez votre compte enseignant et demarrez rapidement votre espace de pilotage.
            </p>
          </div>
          <div className="auth-side-glass-card rounded-2xl p-4">
            <p className="text-sm font-semibold text-white">Inclus des le depart</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>Creation d&apos;activites et parcours</li>
              <li>Suivi des performances des apprenants</li>
              <li>Vision centralisee des indicateurs</li>
            </ul>
          </div>
        </div>
      }
      rightContent={
        <section className="auth-modal-right max-h-[82vh] overflow-y-auto p-8 md:p-10 lg:p-12">
          <form onSubmit={(e) => e.preventDefault()} className="auth-form-wrap space-y-6">
            <div className="space-y-5">
              <span className="auth-header-badge">Nouveau compte</span>
              <h1 className="auth-title">Inscription</h1>
              <p className="auth-subtitle">Completez les informations ci-dessous pour demarrer.</p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="auth-input-register input input-bordered">
                  <HiOutlineUser className="h-4 w-4 opacity-70" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="auth-input-register input input-bordered">
                  <HiOutlineUser className="h-4 w-4 opacity-70" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              {firstName.trim().length > 0 && lastName.trim().length > 0 && (
                <p className={SUCCESS_FEEDBACK_CLASS}>Identite renseignee.</p>
              )}

              <label className="auth-input-register input input-bordered">
                <HiOutlineMail className="h-4 w-4 opacity-70" />
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="auth-input-register input input-bordered">
                  <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label className="auth-input-register input input-bordered">
                  <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                  <input type="password" className="grow" placeholder="Confirmer le mot de passe" />
                </label>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-base-300/60 pt-6">
              <button type="button" onClick={handleClose} className="auth-btn-rounded btn btn-ghost">
                Fermer
              </button>
              <button type="button" className="auth-btn-rounded btn btn-primary">
                Créer le compte
              </button>
            </div>
          </form>
        </section>
      }
    />
  );
};
