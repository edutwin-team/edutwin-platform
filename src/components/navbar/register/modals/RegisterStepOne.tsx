import { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';

import { FormLabel } from '../../../ui/form/FormLabel';

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

// const SUCCESS_FEEDBACK_CLASS = 'text-sm font-medium text-success';

export const RegisterStepOne = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: StepOneProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="space-y-5">
      <span className="auth-header-badge">Nouveau compte</span>
      <h1 className="auth-title">Créer un compte</h1>
      <p className="auth-subtitle">Explorez une nouvelle façon d’apprendre.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <FormLabel className="auth-field-label" required>
            Prénom
          </FormLabel>
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
        </div>

        <div className="space-y-2">
          <FormLabel className="auth-field-label" required>
            Nom
          </FormLabel>
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
      </div>

      {/* {firstName.trim() && lastName.trim() && (
        <p className={SUCCESS_FEEDBACK_CLASS}>Identité renseignée</p>
      )} */}

      <div className="space-y-2">
        <FormLabel className="auth-field-label" required>
          Email
        </FormLabel>
        <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
          <HiOutlineMail className="h-4 w-4 opacity-70" />
          <input
            type="email"
            className="grow"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-2">
        <FormLabel className="auth-field-label" required>
          Mot de passe
        </FormLabel>
        <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
          <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="grow"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>

      <div className="space-y-2">
        <FormLabel className="auth-field-label" required>
          Confirmation du mot de passe
        </FormLabel>
        <label className="input rounded-xl flex items-center gap-2 h-12 px-4">
          <HiOutlineLockClosed className="h-4 w-4 opacity-70" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="grow"
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmPassword ? (
            <HiOutlineEye
              onClick={handleConfirmPasswordVisibility}
              className="h-5 w-5 opacity-70 cursor-pointer"
            />
          ) : (
            <HiOutlineEyeOff
              onClick={handleConfirmPasswordVisibility}
              className="h-5 w-5 opacity-70 cursor-pointer"
            />
          )}
        </label>
      </div>
    </div>
  );
};
