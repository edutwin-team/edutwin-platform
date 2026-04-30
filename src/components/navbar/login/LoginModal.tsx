import { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { AuthModalShell } from '../auth/AuthModalShell';
import { useLogin } from '../../../hooks/user/useLogin';
import { useQueryClient } from '@tanstack/react-query';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    // Email
    if (!email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }

    // Password min 6 letters
    if (!password) {
      newErrors.password = 'Mot de passe requis';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Use the useLogin hook to get the mutate function and loading state
  const { mutate: loginUser, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    loginUser(
      { email, password },
      {
        onSuccess: () => {
          // Invalidate the 'me' query to refetch user data
          queryClient.invalidateQueries({ queryKey: ['me'] });
          onClose();
          window.location.href = '/dashboard';
        },
        onError: () => {
          setErrors({
            password: 'Email ou mot de passe incorrect',
          });
        },
      }
    );
  };

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
        <section className="p-8 md:p-10 lg:p-12">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="space-y-5"
          >
            <div className="space-y-3">
              <span className="auth-header-badge">Espace personnel</span>
              <h1 className="auth-title dark:text-white">Connexion</h1>
              <p className="auth-subtitle">Renseignez vos identifiants pour vous connecter.</p>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="auth-field-label">Email</label>
              <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
                <HiOutlineMail className="h-4 w-4 opacity-70" />
                <input
                  type="email"
                  className="grow"
                  placeholder="nom@ecole.fr"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                />
              </label>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="auth-field-label">Mot de passe</label>
              <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
                <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="grow"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({});
                  }}
                />
                {showPassword ? (
                  <HiOutlineEye
                    onClick={handlePasswordVisibility}
                    className="h-5 w-5 opacity-70 cursor-pointer"
                  />
                ) : (
                  <HiOutlineEyeOff
                    onClick={handlePasswordVisibility}
                    className="h-5 w-5 opacity-70 cursor-pointer"
                  />
                )}
              </label>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="auth-action-row">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  onClose();
                }}
                className="auth-btn-rounded btn btn-ghost"
              >
                Fermer
              </button>
              <button type="submit" className="auth-btn-rounded btn btn-primary px-7">
                Se connecter
              </button>
            </div>
            {isPending && (
              <div className="flex items-center justify-center">
                <span className="loading loading-xl loading-bars text-primary"></span>
              </div>
            )}
          </form>
          <p className="mt-6 border-t border-base-300/60 pt-4 text-sm text-base-content/70">
            Vous n&apos;avez pas encore un compte ?{' '}
            <button
              type="button"
              onClick={onClose}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              S&apos;inscrire
            </button>
          </p>{' '}
        </section>
      }
    />
  );
};
