import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';

type StepOneProps = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
};

const SUCCESS_FEEDBACK_CLASS = 'text-sm font-medium text-success';

export const RegisterStepOne = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
}: StepOneProps) => {
  return (
    <div className="space-y-5">
      <span className="auth-header-badge">Nouveau compte</span>
      <h1 className="auth-title">Inscription</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
          <HiOutlineUser className="h-5 w-5 opacity-70" />
          <input
            type="text"
            className="grow text-sm"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
          <HiOutlineUser className="h-4 w-4 opacity-70" />
          <input
            type="text"
            className="grow "
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      {firstName.trim() && lastName.trim() && (
        <p className={SUCCESS_FEEDBACK_CLASS}>Identité renseignée</p>
      )}

      <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
        <HiOutlineMail className="h-4 w-4 opacity-70" />
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
        <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
        <input
          type="password"
          className="grow"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
        <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
        <input
          type="password"
          className="grow"
          placeholder="Confirmer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </div>
  );
};
