type StatusTagProps = {
  value: string;
  map: Record<string, { label: string; color: string }>;
};

const StatusTag: React.FC<StatusTagProps> = ({ value, map }) => {
  const item = map[value];

  return (
    <span className={`badge badge-sm ${item?.color || 'badge-ghost'}`}>{item?.label || value}</span>
  );
};

export default StatusTag;
