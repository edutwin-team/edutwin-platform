import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="home-footer mt-20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Digital Twin EDU
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Next-generation AI tools to enhance learning materials and simulate student behavior.
          </p>
        </div>
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-indigo-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/digital-twins" className="hover:text-indigo-400 transition">
                Digital Twins
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li className="hover:text-indigo-400 cursor-pointer">Documentation</li>
            <li className="hover:text-indigo-400 cursor-pointer">API Guide</li>
            <li className="hover:text-indigo-400 cursor-pointer">Support</li>
            <li className="hover:text-indigo-400 cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Social icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center gap-5 text-2xl">
            {/* Facebook */}
            <a className="relative group transition" data-testid="icon-facebook">
              <i className="ri-facebook-circle-fill group-hover:text-blue-400 transition"></i>
              <span className="absolute -inset-1 bg-blue-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-[6px] animate-pulse"></span>
            </a>

            {/* Twitter (X) */}
            <a className="relative group transition" data-testid="icon-twitter">
              <i className="ri-twitter-x-fill group-hover:text-sky-400 transition"></i>
              <span className="absolute -inset-1 bg-sky-400/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition bg-gradient-to-r from-transparent via-sky-300/40 to-transparent blur-[6px] animate-pulse"></span>
            </a>

            {/* TikTok */}
            <a className="relative group transition" data-testid="icon-tiktok">
              <i className="ri-tiktok-fill group-hover:text-pink-400 transition"></i>
              <span className="absolute -inset-1 bg-pink-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition bg-gradient-to-r from-transparent via-pink-400/40 to-transparent blur-[6px] animate-pulse"></span>
            </a>

            {/* Instagram */}
            <a className="relative group transition" data-testid="icon-instagram">
              <i className="ri-instagram-fill group-hover:text-pink-500 transition"></i>
              <span className="absolute -inset-1 bg-pink-400/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition bg-gradient-to-r from-transparent via-pink-300/40 to-transparent blur-[6px] animate-pulse"></span>
            </a>

            {/* LinkedIn */}
            <a className="relative group transition" data-testid="icon-linkedin">
              <i className="ri-linkedin-box-fill group-hover:text-blue-500 transition"></i>
              <span className="absolute -inset-1 bg-blue-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition"></span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition bg-gradient-to-r from-transparent via-blue-300/40 to-transparent blur-[6px] animate-pulse"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Digital Twin EDU — All Rights Reserved.
      </div>
    </footer>
  );
}
