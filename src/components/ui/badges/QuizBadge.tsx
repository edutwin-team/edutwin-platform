type QuizBadgeProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
};

export function QuizBadge({ label, variant = 'outline' }: QuizBadgeProps) {
  const styles = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    outline: 'badge-outline',
  };

  return <span className={`badge badge-sm ${styles[variant]}`}>{label}</span>;
}
