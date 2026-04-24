export interface PageMeta {
  title: string;
  context: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': { title: 'Accueil', context: "Bienvenue sur l'espace EduTwin" },
  '/dashboard': { title: 'Dashboard', context: 'Suivi global des jumeaux numériques' },
  '/twins': { title: 'jumeaux numériques', context: 'Gestion des jumeaux numériques' },
  '/profile': { title: 'Profil', context: 'Gérez vos informations personnelles' },
  '/quiz': { title: 'QCM', context: 'Créez et lancez vos évaluations' },
  '/question': { title: 'Simulation', context: 'Analyse en conditions pédagogiques' },
  '/results': { title: 'Résultats', context: 'Consultez les indicateurs de performance' },
  '/teacher': { title: 'Espace enseignant', context: 'Pilotage des activités pédagogiques' },
  '/about': { title: 'À propos', context: 'Informations sur la plateforme' },
  '/settings': { title: 'Paramètres', context: 'Personnalisez votre expérience' },
};

export const DEFAULT_PAGE_META: PageMeta = { title: 'Page', context: 'Navigation EduTwin' };
