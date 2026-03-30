import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginModal } from './login/LoginModal';
import { Register } from './register/Register';

export default function Navbar() {
  const version = __APP_VERSION__;
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <div className="navbar bg-base-200 px-6 shadow">
        <div className="flex-1">
          <div className="tooltip tooltip-bottom" data-tip={`Version ${version}`}>
            <Link to="/" className="text-xl font-bold">
              🎓 EduTwin
            </Link>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          <Link to="/profile" className="btn btn-outline btn-sm">
            Profil
          </Link>

          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <button onClick={() => setIsLoginOpen(true)} className="btn btn-outline btn-sm mr-6">
            Login
          </button>

          <button onClick={() => setIsRegisterOpen(true)} className="btn btn-success btn-sm">
            Register
          </button>
        </div>
      </div>

      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
