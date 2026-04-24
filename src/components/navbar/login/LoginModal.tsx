import { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { AuthModalShell } from '../auth/AuthModalShell';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthModalShell
      isOpen={isOpen}
      onClose={onClose}
      closeLabel="Fermer la connexion"
      maxWidthClass="max-w-4xl"
      minHeightClass="min-h-[420px]"
      leftPanelClassName="auth-modal-side-login hidden lg:flex flex-col justify-between gap-6 p-8 text-white"
      leftContent={
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              EduTwin Platform
            </p>
            <h3 className="text-4xl font-bold leading-tight">Connexion</h3>
            <p className="max-w-xs text-sm text-white/85">
              Reprenez vos activites pedagogiques avec une experience fluide et centralisee.
            </p>
          </div>
          <div className="auth-side-glass-card rounded-2xl p-4">
            <p className="text-sm font-semibold text-white">Ce que vous retrouvez</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>Tableau de bord et progression</li>
              <li>Sessions de simulation en cours</li>
              <li>Historique de resultats et indicateurs</li>
            </ul>
          </div>
        </div>
      }
      rightContent={
        <section className=" p-8 md:p-10 lg:p-12">
          <form className="auth-form-wrap space-y-5">
            <div className="space-y-3">
              <span className="auth-header-badge">Espace personnel</span>
              <h1 className="auth-title dark:text-white">Connexion</h1>
              <p className="auth-subtitle">Renseignez vos identifiants pour vous connecter.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="login-email" className="auth-field-label">
                Email
              </label>
              <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
                <HiOutlineMail className="h-4 w-4 opacity-70" />
                <input
                  id="login-email"
                  type="email"
                  className="grow"
                  placeholder="nom@ecole.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="auth-field-label">
                Mot de passe
              </label>
              <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
                <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                <input
                  id="login-password"
                  type="password"
                  className="grow"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="auth-action-row">
              <button type="button" onClick={onClose} className="auth-btn-rounded btn btn-ghost">
                Fermer
              </button>
              <button type="button" className="auth-btn-rounded btn btn-primary px-7">
                Se connecter
              </button>
            </div>
          </form>
          <p className="mt-6 border-t border-base-300/60 pt-4 text-sm text-base-content/70">
            Vous n&apos;avez pas encore un compte ?{' '}
            <button
              type="button"
              onClick={onClose}
              className="font-medium text-primary hover:underline"
            >
              S&apos;inscrire
            </button>
          </p>
        </section>
      }
    />
  );
};
