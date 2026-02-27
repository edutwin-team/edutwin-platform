import { useState } from 'react';
import { RegisterModal } from './modals/RegisterModal';

type RegisterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Register = ({ isOpen, onClose }: RegisterProps) => {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setStep(1); // reset step quand on ferme
    onClose();
  };

  return <RegisterModal isOpen={isOpen} onClose={handleClose} step={step} setStep={setStep} />;
};
