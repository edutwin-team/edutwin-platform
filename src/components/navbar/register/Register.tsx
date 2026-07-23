import { RegisterModal } from './modals/RegisterModal';

type RegisterProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: () => void;
};

export const Register = ({ isOpen, onClose, onRegisterSuccess }: RegisterProps) => {
  return <RegisterModal isOpen={isOpen} onClose={onClose} onRegisterSuccess={onRegisterSuccess} />;
};
