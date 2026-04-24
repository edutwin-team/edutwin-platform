import { useMemo, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

export type RecommendationLevel = "urgente" | "moderee" | "legere";

export type RecommendationItem = {
  title: string;
  description: string;
  action: string;
};

export type RecommendationGroup = {
  level: RecommendationLevel;
  label: string;
  badgeClassName: string;
  cardClassName: string;
  accentTextClassName: string;
  items: RecommendationItem[];
};

type RecommendationPanelProps = {
  groups: RecommendationGroup[];
  className?: string;
};

export function RecommendationPanel({ groups, className = "mt-4" }: RecommendationPanelProps) {
  const [activeLevel, setActiveLevel] = useState<RecommendationLevel | null>(null);
  const [page, setPage] = useState(0);

  const activeGroup = useMemo(
    () => groups.find((group) => group.level === activeLevel) ?? null,
    [groups, activeLevel],
  );

  const totalPages = activeGroup?.items.length ?? 0;
  const activeItem = activeGroup?.items[page] ?? null;

  const openGroup = (level: RecommendationLevel) => {
    setActiveLevel(level);
    setPage(0);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-xs">
        {groups.map((group) => (
          <button
            key={group.level}
            type="button"
            onClick={() => openGroup(group.level)}
            className={`${group.badgeClassName} badge badge-sm cursor-pointer`}
          >
            {group.items.length} {group.label}
          </button>
        ))}
      </div>

      {activeGroup && activeItem && (
        <div className={`mt-4 rounded-xl border p-4 ${activeGroup.cardClassName}`}>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-base-content dark:text-slate-50">{activeItem.title}</p>
            <button
              type="button"
              className="btn btn-ghost btn-xs rounded-full text-base-content/80 dark:text-slate-100"
              aria-label="Fermer la recommandation"
              onClick={() => setActiveLevel(null)}
            >
              <IoCloseSharp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-base-content/85 dark:text-slate-100">{activeItem.description}</p>
          <p className={`mt-3 text-sm font-semibold ${activeGroup.accentTextClassName}`}>{activeItem.action}</p>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                className="btn btn-ghost btn-xs rounded-full"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                aria-label="Recommandation précédente"
              >
                <HiChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-medium text-base-content/75">
                {page + 1} / {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-ghost btn-xs rounded-full"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page === totalPages - 1}
                aria-label="Recommandation suivante"
              >
                <HiChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
