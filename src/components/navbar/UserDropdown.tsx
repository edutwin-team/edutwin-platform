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

  const roleMap: Record<string, string> = {
    admin: 'Administrateur',
    teacher: 'Enseignant',
    student: 'Étudiant',
  };

  const roleLabel = roleMap[user?.role || 'student'];

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost hover:bg-base-200 px-2 sm:px-3 rounded-2xl transition-all duration-200">
        <div className="flex items-center gap-3">
          {/* user data */}
          <div className="hidden md:flex flex-col items-end leading-tight">
            <p className="text-sm font-semibold text-base-content">
              {user?.first_name} {user?.last_name}
            </p>

            {/* Role tag */}
            <span className="mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
              {roleLabel}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-bold shadow-md">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </button>

      {/* Dropdown */}
      <div className="dropdown-content mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-base-200 bg-base-100">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">
                {user?.first_name} {user?.last_name}
              </p>

              <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
            </div>

            <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Menu */}
        <ul className="menu menu-sm p-2 gap-1">
          <li>
            <Link to="/profile" className="flex items-center gap-2 rounded-xl">
              <HiOutlineUser className="w-4 h-4" />
              Profil
            </Link>
          </li>

          <li>
            <Link to="/settings" className="flex items-center gap-2 rounded-xl">
              <HiOutlineCog className="w-4 h-4" />
              Paramètres
            </Link>
          </li>

          <div className="divider my-1"></div>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-error rounded-xl"
            >
              <HiOutlineLogout className="w-4 h-4" />
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
