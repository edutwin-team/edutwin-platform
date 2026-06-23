import { useContexts } from '../../hooks/twins/useContexts';
import type { Context } from '../../types/types';
import { SimpleLoader } from '../ui/loaders/SimpleLoader';
import { ContextCard } from './ContextCard';

type ContextListProps = {
  onEdit: (context: Context) => void;
};
export const ContextList = ({ onEdit }: ContextListProps) => {
  const { data: contexts, isLoading, isError } = useContexts();
  if (isLoading) {
    return <SimpleLoader />;
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Erreur lors du chargement des contextes</span>
      </div>
    );
  }

  if (!contexts?.length) {
    return (
      <div className="card bg-base-100 border border-base-300 p-6 text-center">
        <h2 className="text-lg font-semibold">Aucun contexte</h2>
        <p className="text-sm text-base-content/70 mt-1">Crée ton premier contexte pédagogique.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {contexts.map((context: Context) => (
        <ContextCard key={context.id} context={context} onEdit={onEdit} />
      ))}
    </div>
  );
};
