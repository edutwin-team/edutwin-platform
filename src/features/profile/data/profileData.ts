import type { ProfilePageData } from '../types';

export const profilePageData: ProfilePageData = {
  heading: 'Profil Élève (Page en cours de développement)',
  description:
    'Cette page représente le jumeau numérique de l’élève. Les données affichées servent à personnaliser les contenus générés par IA.',
  academic: {
    level: 'Intermédiaire',
    subtitle: 'Mathématiques - Français - Sciences',
    scores: [
      { label: 'Mathématiques', value: '74%' },
      { label: 'Français', value: '81%' },
      { label: 'Sciences', value: '69%' },
    ],
  },
  preferences: {
    profileLabel: 'Profil visuel & progressif',
    tags: [
      { label: 'Supports visuels' },
      { label: 'Exemples concrets' },
      { label: 'Feedback immédiat' },
      { label: 'Rythme modéré' },
    ],
    description: 'L’élève progresse mieux avec des contenus scénarisés et des étapes courtes.',
  },
  recurringDifficulties: [
    {
      title: 'Résolution de problèmes complexes',
      description: 'Besoin de guidage pas à pas sur les questions à plusieurs étapes.',
      tone: 'error',
    },
    {
      title: 'Gestion du temps',
      description: 'Tendance à passer trop de temps sur les premiers exercices.',
      tone: 'warning',
    },
  ],
  evaluationHistory: [
    { title: 'QCM Algèbre', date: '12/04', score: '76%', trend: '+4%', trendTone: 'success' },
    {
      title: 'Compréhension écrite',
      date: '09/04',
      score: '82%',
      trend: '+2%',
      trendTone: 'success',
    },
    {
      title: 'Sciences - Raisonnement',
      date: '05/04',
      score: '68%',
      trend: '-1%',
      trendTone: 'warning',
    },
  ],
};
