import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Sparkles } from 'lucide-react';
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
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-base-100/75 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-3 px-3 sm:px-4 lg:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
            <NavbarBrand version={version} />
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center px-4 lg:flex">
            <div className="w-full max-w-xl rounded-2xl border border-base-300/70 bg-base-200/60 px-4 py-2 shadow-inner backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-base-200">
              <div className="flex items-center gap-3 text-sm text-base-content/50">
                <Search className="h-4 w-4 shrink-0" />
                <span className="truncate">Rechercher un élève, un quiz ou un jumeau numérique...</span>
                <kbd className="ml-auto hidden rounded-lg border border-base-300 bg-base-100 px-2 py-0.5 text-[11px] text-base-content/50 xl:inline-flex">
                  Ctrl K
                </kbd>
              </div>
            </div>
          </div>

          <div className="hidden min-w-0 flex-[0.8] justify-center xl:flex">
            <NavbarContext title={currentPage.title} context={currentPage.context} />
          </div>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            <Link
              to="/simulation"
              className="hidden items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/15 md:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Simuler
            </Link>

            <button
              type="button"
              aria-label="Notifications"
              className="btn btn-ghost btn-circle btn-sm relative rounded-2xl"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-base-100" />
            </button>

            <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />

            {user ? (
              <UserDropdown />
            ) : (
              <>
                <div className="hidden sm:block">
                  <AuthActions
                    onLoginClick={() => setIsLoginOpen(true)}
                    onRegisterClick={() => setIsRegisterOpen(true)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsLoginOpen(true)}
                  className="btn btn-primary btn-sm rounded-xl normal-case sm:hidden"
                >
                  Connexion
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
