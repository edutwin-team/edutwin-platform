import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
} from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  setStep: (step: number) => void;
};

export const RegisterModal = ({ isOpen, onClose, step, setStep }: RegisterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl p-0 sm:p-4 relative">
        {/* Close Icon */}
        <IoCloseSharp className="absolute top-4 right-4 w-5 h-5 cursor-pointer" onClick={onClose} />

        <div className="max-h-[80vh] overflow-y-auto p-4">
          <h3 className="font-bold mb-4 text-4xl text-center">Inscription</h3>

          {/* Progress */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500">Étape {step} sur 2</div>
            <progress className="progress progress-primary w-full mt-2" value={step} max={2} />
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
              {/* STEP 1  */}
              {step === 1 && (
                <>
                  <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-info-content">Données personnelles</h1>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineUser className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Prénom" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineUser className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Nom" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineMail className="h-4 w-4 opacity-70" />
                      <input type="email" className="grow" placeholder="Email" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                      <input type="password" className="grow" placeholder="Mot de passe" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                      <input
                        type="password"
                        className="grow"
                        placeholder="Confirmer le mot de passe"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="w-40 h-32 bg-indigo-50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-indigo-100 transition">
                      <span className="text-sm text-primary">Photo de profil</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </>
              )}

              {/* STEP 2 -  */}
              {step === 2 && (
                <>
                  <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-info-content">Informations professionnelles</h1>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Nom de l'école" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineAcademicCap className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Diplôme obtenu" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineBriefcase className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Années d'expérience" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <HiOutlineAcademicCap className="h-4 w-4 opacity-70" />
                      <input type="text" className="grow" placeholder="Matière enseignée" />
                    </label>
                  </div>

                  <div className="flex flex-col justify-center">
                    <textarea
                      placeholder="Décrivez brièvement votre parcours..."
                      className="textarea textarea-bordered w-full h-40"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex justify-between">
              {step === 1 ? (
                <button type="button" onClick={onClose} className="btn">
                  Fermer
                </button>
              ) : (
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  Retour
                </button>
              )}

              {step === 1 ? (
                <button type="button" onClick={() => setStep(2)} className="btn btn-primary">
                  Étape suivante
                </button>
              ) : (
                <button type="button" className="btn btn-success">
                  Finaliser
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
