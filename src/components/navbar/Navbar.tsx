import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginModal } from './login/LoginModal';
import { Register } from './register/Register';
export default function Navbar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const showRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  const hideRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const hideLoginModal = () => {
    setIsLoginOpen(false);
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
          <button onClick={() => showLoginModal()} className="btn btn-outline btn-sm mr-6">
            Login
          </button>

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

      <Register isOpen={isRegisterOpen} onClose={() => hideRegisterModal()} />
      <LoginModal isOpen={isLoginOpen} onClose={() => hideLoginModal()} />
    </>
  );
}
