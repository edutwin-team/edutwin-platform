interface NavbarContextProps {
  title: string;
  context: string;
}

export function NavbarContext({ title, context }: NavbarContextProps) {
  return (
    <div className="min-w-0 rounded-xl border border-base-300/70 bg-base-100/60 px-4 py-2">
      <p className="truncate text-xs font-medium uppercase tracking-wide text-base-content/55">
        Espace / {title}
      </p>
      <p className="truncate text-sm text-base-content/70">{context}</p>
    </div>
  );
}
