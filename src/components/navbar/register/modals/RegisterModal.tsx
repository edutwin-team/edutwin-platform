import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
} from 'react-icons/hi';
import { AuthModalShell } from '../../auth/AuthModalShell';
import { AuthProgressPanel } from '../../auth/AuthProgressPanel';
import { useRegisterFlow } from '../../../../features/auth/hooks/useRegisterFlow';
import { REGISTER_PROGRESS_STEPS } from '../../../../features/auth/config/steps';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SUCCESS_FEEDBACK_CLASS = 'text-sm font-medium text-success';

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const {
    step,
    firstName,
    lastName,
    email,
    password,
    progress,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    goNext,
    goBack,
    reset,
  } = useRegisterFlow();

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <AuthModalShell
      isOpen={isOpen}
      onClose={handleClose}
      closeLabel="Fermer l'inscription"
      maxWidthClass="max-w-5xl"
      minHeightClass="min-h-[620px]"
      leftPanelClassName="auth-modal-side-register flex flex-col justify-between gap-8 p-10 text-white"
      leftContent={
        <>
            <div>
              <p className="badge badge-outline border-white/40 bg-white/10 text-white">Mode QCM</p>
              <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Inscription</h3>
              <p className="mt-3 max-w-sm text-sm text-white/85">
                Creez votre compte avec un mini parcours interactif en 3 etapes.
              </p>
            </div>

            <AuthProgressPanel
              steps={REGISTER_PROGRESS_STEPS}
              currentStep={step}
              progressValue={progress}
              className="space-y-4 p-5"
            />
        </>
      }
      rightContent={
        <section className="max-h-[82vh] overflow-y-auto p-10 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">Etape {step} / 3</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-7">
              {step === 1 && (
                <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">1) Donnees personnelles</h1>
                    <p className="text-sm text-base-content/65">
                      Commencez par vos informations principales.
                    </p>

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
                    {firstName.trim().length > 0 && (
                      <p className={SUCCESS_FEEDBACK_CLASS}>Bonne reponse !</p>
                    )}

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
                    {lastName.trim().length > 0 && (
                      <p className={SUCCESS_FEEDBACK_CLASS}>Bonne reponse !</p>
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
                    {email.trim().length > 0 && (
                      <p className={SUCCESS_FEEDBACK_CLASS}>Bonne reponse !</p>
                    )}

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
                    {password.trim().length > 0 && (
                      <p className={SUCCESS_FEEDBACK_CLASS}>Bonne reponse !</p>
                    )}

                    <label className="auth-input-register input input-bordered">
                      <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                      <input
                        type="password"
                        className="grow"
                        placeholder="Confirmer le mot de passe"
                      />
                    </label>
                  </div>

                  <div className="auth-soft-panel flex flex-col justify-between">
                    <div>
                      <p className="font-semibold">Photo de profil (optionnel)</p>
                      <p className="mt-1 text-sm text-base-content/65">
                        Ajoutez une photo pour personnaliser votre compte.
                      </p>
                    </div>
                    <label className="auth-upload-dropzone">
                      <span className="text-sm font-medium text-primary">Importer une photo</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">2) Profil enseignant</h1>
                    <p className="text-sm text-base-content/65">
                      Quelques infos pour adapter votre experience.
                    </p>

                    <label className="auth-input-register input input-bordered">
                      <HiOutlineOfficeBuilding className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Nom de l'école" />
                    </label>

                    <label className="auth-input-register input input-bordered">
                      <HiOutlineAcademicCap className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Diplôme obtenu" />
                    </label>

                    <label className="auth-input-register input input-bordered">
                      <HiOutlineBriefcase className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Années d'expérience" />
                    </label>

                    <label className="auth-input-register input input-bordered">
                      <HiOutlineAcademicCap className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Matière enseignée" />
                    </label>
                  </div>

                  <div className="auth-soft-panel flex flex-col justify-center">
                    <p className="mb-3 font-semibold">Parcours rapide</p>
                    <textarea
                      placeholder="Décrivez brièvement votre parcours..."
                      className="textarea textarea-bordered h-40 w-full rounded-xl"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">3) Validation finale</h1>
                  <p className="text-sm text-base-content/65">
                    Super, votre profil est pret. Vous pouvez finaliser votre inscription.
                  </p>
                  <div className="auth-summary-card">
                    <p>Resume de vos informations personnelles et professionnelles.</p>
                    <p className="mt-1 text-base-content/70">
                      Vous pourrez completer ou modifier ces donnees plus tard.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-base-300/60 pt-6">
                {step === 1 ? (
                  <button type="button" onClick={handleClose} className="auth-btn-rounded btn btn-ghost">
                    Fermer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    className="auth-btn-rounded btn btn-outline"
                  >
                    Retour
                  </button>
                )}

                {step < 3 ? (
                  <button type="button" onClick={goNext} className="auth-btn-rounded btn btn-primary">
                    Etape suivante
                  </button>
                ) : (
                  <button type="button" className="auth-btn-rounded btn btn-success">
                    Finaliser
                  </button>
                )}
              </div>
            </form>
          </section>
      }
    />
  );
};
