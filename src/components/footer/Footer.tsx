import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="home-footer mt-20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Logo + Description */}
        <div style={{ maxWidth: 280 }}>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            EduTwin
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Des outils IA de nouvelle génération pour enrichir les parcours d'apprentissage et
            simuler le comportement des élèves.
          </p>
        </div>

        {/* Ressources en horizontal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Ressources</h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            <li>
              <Link to="/documentation" className="hover:text-indigo-400 transition text-sm">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-indigo-400 transition text-sm">
                Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-indigo-400 transition text-sm">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Nous suivre</h3>
          <div className="flex items-center gap-5 text-2xl">
            <a className="relative group transition" data-testid="icon-facebook">
              <i className="ri-facebook-circle-fill group-hover:text-blue-400 transition"></i>
              <span className="absolute -inset-1 bg-blue-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
            </a>
            <a className="relative group transition" data-testid="icon-twitter">
              <i className="ri-twitter-x-fill group-hover:text-sky-400 transition"></i>
              <span className="absolute -inset-1 bg-sky-400/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
            </a>
            <a className="relative group transition" data-testid="icon-tiktok">
              <i className="ri-tiktok-fill group-hover:text-pink-400 transition"></i>
              <span className="absolute -inset-1 bg-pink-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
            </a>
            <a className="relative group transition" data-testid="icon-instagram">
              <i className="ri-instagram-fill group-hover:text-pink-500 transition"></i>
              <span className="absolute -inset-1 bg-pink-400/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
            </a>
            <a className="relative group transition" data-testid="icon-linkedin">
              <i className="ri-linkedin-box-fill group-hover:text-blue-500 transition"></i>
              <span className="absolute -inset-1 bg-blue-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduTwin — Tous droits réservés.
      </div>
    </footer>
  );
}
