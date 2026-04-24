import { RegisterModal } from './modals/RegisterModal';

type RegisterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Register = ({ isOpen, onClose }: RegisterProps) => {
  return <RegisterModal isOpen={isOpen} onClose={onClose} />;
};
