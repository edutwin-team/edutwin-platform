import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl p-0 sm:p-4 relative">
        {/* Close Icon */}
        <IoCloseSharp className="absolute top-4 right-4 w-5 h-5 cursor-pointer" onClick={onClose} />
        <div className="max-h-[80vh] overflow-y-scroll p-4">
          <h3 className="font-bold mb-4 text-5xl text-center">Connexion</h3>

          <p className="text-info-content text-center dark:text-white">
            Veuillez entrer vos informations pour accéder à votre compte.
          </p>

          <hr className="mx-auto my-4 w-3/4 text-info-content dark:text-white" />

          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
              {/* LEFT SIDE */}
              <div className="flex flex-col gap-4">
                <h1 className="text-info-content font-bold dark:text-white">
                  Informations de connexion
                </h1>

                {/* Email */}
                <label className="input input-bordered flex items-center gap-2">
                  <HiOutlineMail className="h-4 w-4 opacity-70" />
                  <input type="email" className="grow" placeholder="Email" />
                </label>

                {/* Password */}
                <label className="input input-bordered flex items-center gap-2">
                  <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
                  <input type="password" className="grow" placeholder="Mot de passe" />
                </label>

                <p className="text-sm text-primary cursor-pointer">Mot de passe oublié ?</p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <div className="w-40 h-32 bg-indigo-50 flex items-center justify-center rounded-lg">
                  <span className="text-primary font-semibold">Bienvenue 👋</span>
                </div>

                <p className="text-info-content text-sm dark:text-white">
                  Connectez-vous pour accéder à votre espace personnel.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap ml-10 gap-4">
              <button type="button" onClick={onClose} className="btn">
                Fermer
              </button>

              <button type="button" className="btn btn-primary">
                Se connecter
              </button>
            </div>
          </form>

          {/* Bottom link */}
          <p className="ml-13 mt-3 text-info-content dark:text-white">
            Vous n'avez pas encore un compte ?{' '}
            <span onClick={onClose} className="text-primary cursor-pointer">
              S'inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
