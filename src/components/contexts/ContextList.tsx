import { useContexts } from '../../hooks/twins/useContexts';
import type { Context } from '../../types/types';
import { ContextCard } from './ContextCard';

// const mockContexts = [
//   {
//     id: 1,
//     name: 'Contexte Mathématiques Avancées',
//     description: "Contexte pour l'enseignement des mathématiques niveau licence",
//     school: 'Université Paris-Saclay',
//     country: 'France',
//     level: 'Licence 1',
//     subject: 'Mathématiques',
//     students: 3,
//     objectives: 3,
//   },
//   {
//     id: 2,
//     name: 'Contexte Physique Quantique',
//     description: 'Contexte pour la physique quantique niveau master',
//     school: 'École Polytechnique',
//     country: 'France',
//     level: 'Master 1',
//     subject: 'Physique Quantique',
//     students: 3,
//     objectives: 3,
//   },
// ];

type ContextListProps = {
  onEdit: (context: Context) => void;
};
export const ContextList = ({ onEdit }: ContextListProps) => {
  const { data: contexts, isLoading, isError } = useContexts();
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
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
