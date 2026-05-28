export interface PageMeta {
  title: string;
  context: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': { title: 'Accueil', context: "Bienvenue sur l'espace EduTwin" },

  '/dashboard': {
    title: 'Tableau de bord',
    context: 'Suivi global des jumeaux numériques',
  },

  '/twins': {
    title: 'Jumeaux numériques',
    context: 'Gestion des profils d’apprenants simulés',
  },

  '/content': {
    title: 'Contenu pédagogique',
    context: 'Créez et gérez vos contenus pédagogiques',
  },

  '/contexts': {
    title: 'Contexte pédagogique',
    context: 'Définissez les groupes et environnements de simulation',
  },

  '/question': {
    title: 'Simulation',
    context: 'Lancez et analysez des simulations pédagogiques',
  },

  '/results': {
    title: 'Résultats',
    context: 'Consultez les indicateurs et feedbacks générés',
  },

  '/profile': {
    title: 'Profil',
    context: 'Gérez vos informations personnelles',
  },

  '/teacher': {
    title: 'Espace enseignant',
    context: 'Pilotage des activités pédagogiques',
  },

  '/settings': {
    title: 'Paramètres',
    context: 'Personnalisez votre expérience',
  },

  '/about': {
    title: 'À propos',
    context: 'Informations sur la plateforme',
  },
};

export const DEFAULT_PAGE_META: PageMeta = { title: 'Page', context: 'Navigation EduTwin' };
