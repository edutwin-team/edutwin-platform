import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterModal } from './modals/RegisterModal';

export default function Navbar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const showRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const hideRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  return (
    <>
      <div className="navbar bg-base-200 px-6 shadow">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            🎓 EduTwin
          </Link>
        </div>

        <div className="flex-1">
          <Link to="/login" className="btn btn-outline btn-sm mr-6">
            Login
          </Link>

          <button onClick={() => showRegisterModal()} className="btn btn-success btn-sm">
            Register
          </button>
        </div>

        <div className="flex gap-2">
          <Link to="/profile" className="btn btn-outline btn-sm">
            Profil
          </Link>

          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => hideRegisterModal()} />
    </>
  );
}
