import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const version = __APP_VERSION__;
  const location = useLocation();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { user } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const currentPage = PAGE_META[location.pathname] ?? DEFAULT_PAGE_META;
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

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
          <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />

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

      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
