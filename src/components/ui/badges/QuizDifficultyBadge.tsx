type QuizDifficultyBadgeProps = {
  level: 'easy' | 'medium' | 'hard';
};

export function QuizDifficultyBadge({ level }: QuizDifficultyBadgeProps) {
  const map = {
    easy: { label: 'Facile', color: 'badge-success' },
    medium: { label: 'Moyen', color: 'badge-warning' },
    hard: { label: 'Difficile', color: 'badge-error' },
  };

  return <span className={`badge badge-sm ${map[level].color}`}>{map[level].label}</span>;
}
