import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { AuthModalShell } from '../auth/AuthModalShell';
import { AuthProgressPanel } from '../auth/AuthProgressPanel';
import { useLoginFlow } from '../../../features/auth/hooks/useLoginFlow';
import { LOGIN_PROGRESS_STEPS } from '../../../features/auth/config/steps';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    step,
    profile,
    email,
    password,
    canContinueStep1,
    canContinueStep2,
    progress,
    setProfile,
    setEmail,
    setPassword,
    goToStep,
  } = useLoginFlow();

  return (
    <AuthModalShell
      isOpen={isOpen}
      onClose={onClose}
      closeLabel="Fermer la connexion"
      maxWidthClass="max-w-4xl"
      minHeightClass="min-h-[520px]"
      leftPanelClassName="auth-modal-side-login flex flex-col justify-between gap-6 p-8 text-white"
      leftContent={
        <>
            <div>
              <p className="badge badge-outline border-white/40 bg-white/10 text-white">Mode QCM</p>
              <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Connexion fun</h3>
              <p className="mt-3 max-w-sm text-sm text-white/85">
                3 questions rapides et vous etes connecte.
              </p>
            </div>
            <AuthProgressPanel steps={LOGIN_PROGRESS_STEPS} currentStep={step} progressValue={progress} />
        </>
      }
      rightContent={
        <section className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">Etape {step} / 3</p>

            {step === 1 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-2xl font-bold">1) Vous etes plutot...</h4>
                <p className="text-sm text-base-content/65">Choisissez un profil pour personnaliser votre experience.</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {['Etudiant', 'Enseignant'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setProfile(option)}
                      className={`btn h-auto min-h-16 rounded-2xl justify-start px-4 text-left normal-case ${
                        profile === option ? 'btn-primary text-primary-content' : 'btn-outline'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={onClose} className="auth-btn-rounded btn btn-ghost">
                    Fermer
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    disabled={!canContinueStep1}
                    className="auth-btn-rounded btn btn-primary px-7"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form className="mt-6 space-y-5">
                <h4 className="text-2xl font-bold">2) Vos identifiants</h4>
                <p className="text-sm text-base-content/65">On y est presque, saisissez vos informations de connexion.</p>
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium text-base-content/80">
                    Email
                  </label>
                  <label className="auth-input-login input input-bordered focus-within:outline focus-within:outline-2 focus-within:outline-primary/40">
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
                  <label htmlFor="login-password" className="text-sm font-medium text-base-content/80">
                    Mot de passe
                  </label>
                  <label className="auth-input-login input input-bordered focus-within:outline focus-within:outline-2 focus-within:outline-primary/40">
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
                  <button type="button" onClick={() => goToStep(1)} className="auth-btn-rounded btn btn-ghost">
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    disabled={!canContinueStep2}
                    className="auth-btn-rounded btn btn-primary px-7"
                  >
                    Continuer
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="mt-6 space-y-5">
                <h4 className="text-2xl font-bold">3) Pret a vous connecter ?</h4>
                <div className="auth-summary-card">
                  <p>
                    <span className="font-semibold">Profil :</span> {profile}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Email :</span> {email || '-'}
                  </p>
                </div>
                <p className="text-sm text-base-content/65">Parfait, on lance votre session EduTwin.</p>
                <div className="auth-action-row">
                  <button type="button" onClick={() => goToStep(2)} className="auth-btn-rounded btn btn-ghost">
                    Retour
                  </button>
                  <button type="button" className="auth-btn-rounded btn btn-primary px-7">
                    Se connecter
                  </button>
                </div>
              </div>
            )}

            <p className="mt-6 text-sm text-base-content/70">
              Vous n&apos;avez pas encore un compte ?{' '}
              <button type="button" onClick={onClose} className="font-medium text-primary hover:underline">
                S&apos;inscrire
              </button>
            </p>
          </section>
      }
    />
  );
};
