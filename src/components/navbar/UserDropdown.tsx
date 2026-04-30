import { useAuth } from '../../context/useAuth';

import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/user/useLogout';

export const UserDropdown = () => {
  const { user } = useAuth();
  const { mutate: logoutUser } = useLogout();

  const handleLogout = async () => {
    logoutUser();
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar */}
      <button className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/40 transition">
        <div className="w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </button>

      {/* Dropdown */}
      <div className="dropdown-content mt-3 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl p-2">
        {/* Header */}
        <div className="px-3 py-2 border-b border-base-200">
          <p className="text-sm font-semibold">{user?.first_name || 'Utilisateur'}</p>
          <p className="text-xs opacity-60 truncate">{user?.email}</p>
        </div>

        {/* Menu */}
        <ul className="menu menu-sm p-2 gap-1">
          <li>
            <Link to={'/profile'} className="flex items-center gap-2">
              <HiOutlineUser className="w-4 h-4" />
              Profil
            </Link>
          </li>

          <li>
            <Link to={'/settings'} className="flex items-center gap-2">
              <HiOutlineCog className="w-4 h-4" />
              Paramètres
            </Link>
          </li>

          <div className="divider my-1"></div>

          <li>
            <button onClick={handleLogout} className="flex items-center gap-2 text-error">
              <HiOutlineLogout className="w-4 h-4" />
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
