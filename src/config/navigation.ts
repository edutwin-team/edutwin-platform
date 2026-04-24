import {
  HiChartBar,
  HiCog,
  HiDocumentText,
  HiHome,
  HiPlay,
  HiUser,
} from "react-icons/hi";
import type { IconType } from "react-icons";

export interface NavigationLink {
  name: string;
  path: string;
  icon: IconType;
}

export const sidebarLinks: NavigationLink[] = [
  { name: "Tableau de bord", path: "/dashboard", icon: HiHome },
  { name: "Profil", path: "/profile", icon: HiUser },
  { name: "Générateur de QCM", path: "/quiz", icon: HiDocumentText },
  { name: "Simulation", path: "/question", icon: HiPlay },
  { name: "Résultats", path: "/results", icon: HiChartBar },
  { name: "Espace enseignant", path: "/teacher", icon: HiUser },
  { name: "Paramètres", path: "/settings", icon: HiCog },
];
