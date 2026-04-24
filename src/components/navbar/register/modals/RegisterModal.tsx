import { useState } from 'react';
import { RegisterStepOne } from './RegisterStepOne';
import { RegisterStepTwo } from './RegisterStepTwo';
import { AuthModalShell } from '../../auth/AuthModalShell';

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
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [document, setDocument] = useState<File | null>(null);

  const handleClose = () => {
    setStep(1);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDegree('');
    setUniversity('');
    setDocument(null);
    onClose();
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    console.log({
      firstName,
      lastName,
      email,
      password,
      degree,
      university,
      document,
    });
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
          {/* HEADER */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Inscription</h3>
            <p className="text-sm opacity-90">
              Configurez votre compte enseignant et démarrez rapidement votre espace de pilotage.
            </p>
          </div>

          {/* FEATURES */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 space-y-3">
            <p className="font-semibold">Inclus dès le départ</p>
            <ul className="text-sm space-y-2 opacity-90">
              <li>✔ Création d'activités et parcours</li>
              <li>✔ Suivi des performances des apprenants</li>
              <li>✔ Vision centralisée des indicateurs</li>
            </ul>
          </div>

          {/* PROGRESS */}
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
        <section className="p-8 md:p-10 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <RegisterStepOne
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <RegisterStepTwo
                degree={degree}
                setDegree={setDegree}
                university={university}
                setUniversity={setUniversity}
                setDocument={setDocument}
              />
            )}

            {/* BUTTONS */}
            <div className="flex justify-between pt-6 border-t">
              <button type="button" onClick={handleClose} className="btn btn-ghost">
                Fermer
              </button>

              <div className="flex gap-2">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                    Retour
                  </button>
                )}

                {step === 1 ? (
                  <button type="button" onClick={() => setStep(2)} className="btn btn-primary">
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Créer le compte
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>
      }
    />
  );
};
