import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page introuvable</h2>

      <p className="text-gray-600 max-w-md mb-6">
        Oups... La page que vous recherchez n’existe pas ou a été déplacée.
      </p>

      <Link
        to="/"
        className=" btn btn-primary  font-medium px-6 py-3 rounded-xl transition duration-200 shadow-md"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
