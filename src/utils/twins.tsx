export const PreferredContentTypeMap: Record<string, { label: string; color: string }> = {
  text: { label: 'Texte', color: 'badge-info' },
  video: { label: 'Vidéo', color: 'badge-warning' },
  quiz: { label: 'Quiz', color: 'badge-success' },
  image: { label: 'Image', color: 'badge-secondary' },
  interactive: { label: 'Interactif', color: 'badge-accent' },
  mixed: { label: 'Mixte', color: 'badge-neutral' },
};

export const LearningStyleMap: Record<string, { label: string; color: string }> = {
  visual: { label: 'Visuel', color: 'badge-primary' },
  practical: { label: 'Pratique', color: 'badge-success' },
  theoretical: { label: 'Théorique', color: 'badge-info' },
  exercise_based: { label: 'Exercices', color: 'badge-warning' },
  mixed: { label: 'Mixte', color: 'badge-neutral' },
};
