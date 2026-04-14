import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginModal } from './login/LoginModal';
import { Register } from './register/Register';

export default function Navbar() {
  const version = __APP_VERSION__;
  const location = useLocation();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const pageMeta: Record<string, { title: string; context: string }> = {
    '/': { title: 'Accueil', context: "Bienvenue sur l'espace EduTwin" },
    '/dashboard': { title: 'Dashboard', context: 'Suivi global des jumeaux numériques' },
    '/profile': { title: 'Profil', context: 'Gérez vos informations personnelles' },
    '/quiz': { title: 'QCM', context: 'Créez et lancez vos évaluations' },
    '/question': { title: 'Simulation', context: 'Analyse en conditions pédagogiques' },
    '/results': { title: 'Résultats', context: 'Consultez les indicateurs de performance' },
    '/teacher': { title: 'Espace enseignant', context: 'Pilotage des activités pédagogiques' },
    '/about': { title: 'À propos', context: 'Informations sur la plateforme' },
    '/settings': { title: 'Paramètres', context: 'Personnalisez votre expérience' },
  };

  const currentPage = pageMeta[location.pathname] ?? { title: 'Page', context: 'Navigation EduTwin' };
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <div className="navbar sticky top-0 z-30 border-b border-base-300/70 bg-base-100/85 px-4 shadow-sm backdrop-blur-xl md:px-6">
        <div className="navbar-start">
          <div className="tooltip tooltip-bottom" data-tip={`Version ${version}`}>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo_edutwin_brand.svg"
                alt="Logo EduTwin"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden min-w-0 px-4 md:flex">
          <div className="min-w-0 rounded-xl border border-base-300/70 bg-base-100/60 px-4 py-2">
            <p className="truncate text-xs font-medium uppercase tracking-wide text-base-content/55">
              Espace / {currentPage.title}
            </p>
            <p className="truncate text-sm text-base-content/70">{currentPage.context}</p>
          </div>
        </div>

        <div className="navbar-end gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-base-300/70 px-3 py-1.5">
            <span className="text-xs text-base-content/70">☀️</span>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-label="Activer le mode sombre"
            />
            <span className="text-xs text-base-content/70">🌙</span>
          </label>

          <button onClick={() => setIsLoginOpen(true)} className="btn btn-outline btn-sm rounded-xl normal-case">
            Connexion
          </button>

          <button onClick={() => setIsRegisterOpen(true)} className="btn btn-success btn-sm rounded-xl normal-case">
            S'inscrire
          </button>

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
