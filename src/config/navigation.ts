import {
  HiChartBar,
  HiCog,
  HiCollection,
  HiDocumentText,
  HiHome,
  HiPlay,
  HiUser,
  HiUsers,
} from 'react-icons/hi';
import type { IconType } from 'react-icons';

export interface NavigationLink {
  name: string;
  path: string;
  icon: IconType;
}

export const sidebarLinks: NavigationLink[] = [
  { name: 'Tableau de bord', path: '/dashboard', icon: HiHome },
  { name: 'Contexte pédagogique', path: '/contexts', icon: HiCollection },
  { name: 'Jumeau numérique', path: '/twins', icon: HiUsers },
  { name: 'Quiz', path: '/quizzes', icon: HiDocumentText },
  { name: 'Simulation', path: '/simulation', icon: HiPlay },
  { name: 'Résultats', path: '/results', icon: HiChartBar },
  { name: 'Profil', path: '/profile', icon: HiUser },
  { name: 'Espace enseignant', path: '/teacher', icon: HiUser },
  { name: 'Paramètres', path: '/settings', icon: HiCog },
];
