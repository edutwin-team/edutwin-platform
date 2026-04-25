import type { TeacherPageData } from '../types';

export const teacherPageData: TeacherPageData = {
  heading: 'Espace Enseignant',
  description: 'Pilotez les performances, la qualité des questions et les ajustements.',
  kpis: {
    studentPerformance: {
      title: 'Suivi des performances élèves',
      value: '78%',
      subtitle: 'Taux moyen de réussite global.',
      description:
        'Visualisez les tendances par classe, compétence et niveau pour identifier rapidement les axes d’amélioration.',
      progress: 78,
    },
    questionQuality: {
      title: 'Qualité des questions',
      value: '4.2 / 5',
      subtitle: 'Score de pertinence pédagogique.',
      description:
        'Analysez la clarté, la difficulté et la discrimination des items pour améliorer la fiabilité des QCM.',
      stars: 4,
    },
    contentAdjustment: {
      title: 'Ajustement des contenus',
      value: '12',
      subtitle: 'Recommandations actives.',
      description:
        'Recevez des suggestions contextualisées pour renforcer les notions non acquises et équilibrer les parcours.',
    },
  },
  actionSteps: [
    {
      title: '1. Diagnostiquer',
      description: 'Repérez les compétences fragiles et les écarts de performance entre groupes.',
    },
    {
      title: '2. Optimiser les questions',
      description:
        'Ajustez formulations, distracteurs et niveaux de difficulté selon les retours d’usage.',
    },
    {
      title: '3. Adapter les contenus',
      description: 'Déployez des contenus ciblés pour chaque profil d’apprentissage.',
    },
  ],
  recommendations: [
    {
      level: 'urgente',
      label: 'urgente',
      badgeClassName: 'badge-error',
      cardClassName: 'border-error/55 bg-error/20 dark:border-error/60 dark:bg-error/35',
      accentTextClassName: 'text-red-900 dark:text-red-100',
      items: [
        {
          title: 'Ajustement urgent',
          description:
            'Le raisonnement logique décroche sur les évaluations longues. Recommandation: réduire la charge cognitive et séquencer les consignes.',
          action: 'Réviser 5 questions à fort impact avant la prochaine session.',
        },
        {
          title: 'Ajustement urgent',
          description:
            'Les erreurs répétées portent sur les mêmes compétences noyaux. Recommandation: introduire un rappel ciblé avant chaque activité.',
          action: 'Lancer un module de remédiation immédiate pour la compétence critique.',
        },
      ],
    },
    {
      level: 'moderee',
      label: 'modérée',
      badgeClassName: 'badge-warning',
      cardClassName: 'border-warning/55 bg-warning/20 dark:border-warning/60 dark:bg-amber-900/45',
      accentTextClassName: 'text-amber-900 dark:text-amber-100',
      items: [
        {
          title: 'Ajustement modéré',
          description:
            'La compréhension des consignes reste correcte mais variable selon le format de question.',
          action: 'Uniformiser les formulations et ajouter un exemple guidé par séquence.',
        },
      ],
    },
    {
      level: 'legere',
      label: 'légère',
      badgeClassName: 'badge-info',
      cardClassName: 'border-info/55 bg-info/20 dark:border-info/60 dark:bg-sky-900/45',
      accentTextClassName: 'text-blue-900 dark:text-sky-100',
      items: [
        {
          title: 'Ajustement léger',
          description:
            'Les compétences secondaires progressent bien, mais demandent encore une consolidation régulière.',
          action: 'Prévoir un micro-quiz de consolidation en fin de séance.',
        },
      ],
    },
  ],
};
