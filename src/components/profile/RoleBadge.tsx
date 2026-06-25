export function RoleBadge({ role }: { role?: string }) {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold border';

  if (role === 'admin') {
    return <span className={`${base} bg-red-500/10 text-red-500 border-red-500/20`}>Admin</span>;
  }

  if (role === 'teacher') {
    return (
      <span className={`${base} bg-blue-500/10 text-blue-500 border-blue-500/20`}>Enseignant</span>
    );
  }

  return (
    <span className={`${base} bg-green-500/10 text-green-500 border-green-500/20`}>Étudiant</span>
  );
}
