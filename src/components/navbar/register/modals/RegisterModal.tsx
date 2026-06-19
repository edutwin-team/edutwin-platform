import { useState } from 'react';
import { RegisterStepOne } from './RegisterStepOne';
import { RegisterStepTwo } from './RegisterStepTwo';
import { AuthModalShell } from '../../auth/AuthModalShell';
import { useRegister } from '../../../../hooks/user/useRegister';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [step, setStep] = useState(1);

  // Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2
  const [diploma, setDiploma] = useState('');
  const [school, setSchool] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [experienceYears, setExperienceYears] = useState('');

  const [error, setError] = useState('');
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { mutate: registerUser, isPending } = useRegister();

  const goToStep = (newStep: number) => {
    setStep(newStep);
    setError('');
  };

  const handleClose = () => {
    goToStep(1);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setDiploma('');
    setSchool('');
    setInstitutionType('');

    setEducationLevel('');
    setExperienceYears('');

    onClose();
  };

  // STEP 1
  const handleNext = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Email invalide');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    goToStep(2);
  };

  // STEP 2
  const handleSubmit = () => {
    if (!diploma || !school || !institutionType || !educationLevel || !experienceYears) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setError('');

    registerUser(
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        educational_profile: {
          school,
          diploma,
          institution_type: institutionType,
          education_level: educationLevel,
          experience_years: Number(experienceYears),
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (err) => {
          setError("Erreur lors de l'inscription");
          console.log(err);
        },
      }
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNext();
      return;
    }

    handleSubmit();
  };

  return (
    <AuthModalShell
      isOpen={isOpen}
      onClose={handleClose}
      closeLabel="Fermer l'inscription"
      maxWidthClass="max-w-4xl"
      minHeightClass="min-h-[500px]"
      leftPanelClassName="hidden lg:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-primary to-secondary"
      leftContent={
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Inscription</h3>
            <p className="text-sm opacity-90">
              Configurez votre compte enseignant et démarrez rapidement votre espace de pilotage.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-4 space-y-3">
            <p className="font-semibold">Inclus dès le départ</p>
            <ul className="text-sm space-y-2 opacity-90">
              <li>✔ Création d'activités et parcours</li>
              <li>✔ Suivi des performances des apprenants</li>
              <li>✔ Vision centralisée des indicateurs</li>
            </ul>
          </div>

          <div>
            <p className="text-sm mb-2">Étape {step} / 2</p>
            <div className="w-full bg-white/20 h-2 rounded">
              <div
                className="bg-white h-2 rounded transition-all"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>
        </div>
      }
      rightContent={
        <section className="p-8 md:p-10 w-full right-panel-bg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(e);
            }}
            className="space-y-6"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <RegisterStepOne
                firstName={firstName}
                setFirstName={(v) => {
                  setFirstName(v);
                  setError('');
                }}
                lastName={lastName}
                setLastName={(v) => {
                  setLastName(v);
                  setError('');
                }}
                email={email}
                setEmail={(v) => {
                  setEmail(v);
                  setError('');
                }}
                password={password}
                setPassword={(v) => {
                  setPassword(v);
                  setError('');
                }}
                confirmPassword={confirmPassword}
                setConfirmPassword={(v) => {
                  setConfirmPassword(v);
                  setError('');
                }}
              />
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <RegisterStepTwo
                diploma={diploma}
                setDiploma={(v) => {
                  setDiploma(v);
                  setError('');
                }}
                school={school}
                setSchool={(v) => {
                  setSchool(v);
                  setError('');
                }}
                institutionType={institutionType}
                setInstitutionType={(v) => {
                  setInstitutionType(v);
                  setError('');
                }}
                educationLevel={educationLevel}
                setEducationLevel={(v) => {
                  setEducationLevel(v);
                  setError('');
                }}
                experienceYears={experienceYears}
                setExperienceYears={(v) => {
                  setExperienceYears(v);
                  setError('');
                }}
              />
            )}

            {/* error msg */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>
            )}

            {/* btns */}
            <div className="flex justify-between pt-6 border-t">
              <button type="button" onClick={handleClose} className="btn btn-ghost">
                Fermer
              </button>

              <div className="flex gap-2">
                {step === 2 && (
                  <button type="button" onClick={() => goToStep(1)} className="btn btn-outline">
                    Retour
                  </button>
                )}

                {step === 1 ? (
                  <button type="submit" className="btn btn-primary">
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Créer le compte
                  </button>
                )}
              </div>
            </div>
            {isPending && (
              <div className="flex items-center justify-center">
                <span className="loading loading-xl loading-bars text-primary"></span>
              </div>
            )}
          </form>
          <p className="mt-6 border-t border-base-300/60 pt-4 text-sm text-base-content/70 text-center">
            Déjà un compte ?{' '}
            <button
              type="button"
              onClick={onClose}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Se connecter
            </button>
          </p>{' '}
        </section>
      }
    />
  );
};
