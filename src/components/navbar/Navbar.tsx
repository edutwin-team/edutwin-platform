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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-base-300/70 bg-base-100/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <NavbarBrand version={version} />
          </div>

          <div className="hidden min-w-0 flex-[1.4] justify-center px-4 lg:flex">
            <NavbarContext title={currentPage.title} context={currentPage.context} />
          </div>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-1.5 sm:gap-2 md:gap-3">
            <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />

            {user ? (
              <UserDropdown />
            ) : (
              <div className="hidden sm:block">
                <AuthActions
                  onLoginClick={() => setIsLoginOpen(true)}
                  onRegisterClick={() => setIsRegisterOpen(true)}
                />
              </div>
            )}

            {!user && (
              <button
                type="button"
                aria-label="Connexion mobile"
                onClick={() => setIsLoginOpen(true)}
                className="btn btn-primary btn-sm rounded-xl normal-case sm:hidden"
              >
                Login
              </button>
            )}

            <Link
              to="/dashboard"
              className="btn btn-primary btn-sm hidden rounded-xl normal-case md:inline-flex"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
