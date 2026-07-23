import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginModal } from './login/LoginModal';
import { Register } from './register/Register';
import { NavbarBrand } from './NavbarBrand';
import { NavbarContext } from './NavbarContext';
import { ThemeSwitch } from './ThemeSwitch';
import { AuthActions } from './AuthActions';
import { PAGE_META, DEFAULT_PAGE_META } from '../../config/pageMeta';
import { useAuth } from '../../context/useAuth';
import { UserDropdown } from './UserDropdown';
import { useSettings } from '../../features/settings/useSettings';

export default function Navbar() {
  const version = __APP_VERSION__;
  const location = useLocation();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { settings, toggleTheme } = useSettings();
  const { user } = useAuth();
  const [registerSuccess, setRegisterSuccess] = useState('');
  const handleRegisterSuccess = () => {
    setRegisterSuccess(
      'Compte créé avec succès ! Vérifiez votre boîte mail pour activer votre compte.'
    );

    setTimeout(() => {
      setRegisterSuccess('');
    }, 6000);
  };

  const currentPage = PAGE_META[location.pathname] ?? DEFAULT_PAGE_META;

  return (
    <>
      <div className="navbar sticky top-0 z-30 border-b border-base-300/70 bg-base-100/85 px-4 shadow-sm backdrop-blur-xl md:px-6">
        <div className="navbar-start">
          <NavbarBrand version={version} />
        </div>

        <div className="navbar-center hidden min-w-0 px-4 md:flex">
          <NavbarContext title={currentPage.title} context={currentPage.context} />
        </div>

        <div className="navbar-end gap-3">
          <ThemeSwitch isDark={settings.theme === 'dark'} onToggle={toggleTheme} />

          {user ? (
            <UserDropdown />
          ) : (
            <AuthActions
              onLoginClick={() => setIsLoginOpen(true)}
              onRegisterClick={() => setIsRegisterOpen(true)}
            />
          )}

          <Link to="/dashboard" className="btn btn-primary btn-sm rounded-xl normal-case md:hidden">
            Aller
          </Link>
        </div>
      </div>

      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {registerSuccess && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2">
          <div className="alert alert-success shadow-lg max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2A9 9 0 1112 3a9 9 0 019 9z"
              />
            </svg>

            <span>{registerSuccess}</span>
          </div>
        </div>
      )}
    </>
  );
}
