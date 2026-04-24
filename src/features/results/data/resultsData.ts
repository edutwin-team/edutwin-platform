import type { ResultsPageData } from "../types";

export const resultsPageData: ResultsPageData = {
  heading: "Résultats & Feedback",
  description: "Analyse des réponses de l’élève et recommandations pédagogiques.",
  kpis: {
    successRate: {
      title: "Taux de réussite",
      value: "81%",
      subtitle: "Score global sur la session.",
      description: "Résultat stable, avec une meilleure performance sur les questions d’application.",
      progress: 81,
    },
    acquiredSkills: {
      title: "Compétences acquises",
      value: "6 / 8",
      subtitle: "Compétences validées.",
      description: "Les bases sont maîtrisées. Les compétences avancées demandent encore de la consolidation.",
      tags: ["Analyse", "Méthodologie", "Argumentation"],
    },
    improvementTracks: {
      title: "Pistes d’amélioration",
      value: "3",
      subtitle: "Axes prioritaires identifiés.",
      description: "Renforcer la précision des réponses et la gestion du temps sur les items complexes.",
    },
  },
  feedbackBlocks: [
    {
      title: "Forces",
      description: "Bonne compréhension des consignes et raisonnement structuré sur la majorité des questions.",
    },
    {
      title: "Points à renforcer",
      description: "Travailler la justification des réponses et la relecture avant validation finale.",
    },
    {
      title: "Recommandation",
      description: "Proposer un entraînement ciblé de 20 minutes sur les compétences non encore stabilisées.",
    },
  ],
  recommendations: [
    {
      level: "urgente",
      label: "urgente",
      badgeClassName: "badge-error",
      cardClassName: "border-error/55 bg-error/20 dark:border-error/60 dark:bg-error/35",
      accentTextClassName: "text-red-900 dark:text-red-100",
      items: [
        {
          title: "Piste urgente",
          description:
            "L'élève valide trop vite les questions complexes. Recommandation: imposer une relecture guidée avec justification obligatoire sur les items à fort coefficient.",
          action: "Mettre en place 2 sessions ciblées de 15 minutes cette semaine.",
        },
        {
          title: "Piste urgente",
          description:
            "Le taux d'erreurs augmente sur les dernières questions. Recommandation: introduire des pauses courtes et un contrôle de rythme à mi-session.",
          action: "Programmer une session d'entraînement en temps contraint avec correction guidée.",
        },
      ],
    },
    {
      level: "moderee",
      label: "modérée",
      badgeClassName: "badge-warning",
      cardClassName: "border-warning/55 bg-warning/20 dark:border-warning/60 dark:bg-amber-900/45",
      accentTextClassName: "text-amber-900 dark:text-amber-100",
      items: [
        {
          title: "Piste modérée",
          description:
            "La précision des réponses baisse en milieu d'évaluation. Recommandation: alterner questions courtes et questions longues pour stabiliser l'attention.",
          action: "Créer un entraînement adaptatif centré sur la progression par paliers.",
        },
        {
          title: "Piste modérée",
          description:
            "La maîtrise des consignes est correcte mais inconstante. Recommandation: renforcer les consignes de méthode avant chaque exercice.",
          action: "Ajouter un rappel méthodologique en introduction de chaque nouveau bloc.",
        },
      ],
    },
    {
      level: "legere",
      label: "légère",
      badgeClassName: "badge-info",
      cardClassName: "border-info/55 bg-info/20 dark:border-info/60 dark:bg-sky-900/45",
      accentTextClassName: "text-blue-900 dark:text-sky-100",
      items: [
        {
          title: "Piste légère",
          description:
            "Les acquis sont solides mais encore irréguliers sur quelques notions secondaires. Recommandation: renforcer par des rappels rapides en début de séance.",
          action: "Ajouter un quiz de consolidation de 5 minutes en fin de cours.",
        },
      ],
    },
  ],
};
