type QuestionTypeBadgeProps = {
  type: 'single_choice' | 'multiple_choice' | 'true_false';
};

export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  const map = {
    single_choice: {
      label: 'Choix unique',
      color: 'badge-info',
    },
    multiple_choice: {
      label: 'Choix multiple',
      color: 'badge-primary',
    },
    true_false: {
      label: 'Vrai / Faux',
      color: 'badge-secondary',
    },
  };

  return <span className={`badge badge-sm ${map[type].color}`}>{map[type].label}</span>;
}
