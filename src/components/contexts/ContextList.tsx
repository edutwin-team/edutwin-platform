import { ContextCard } from './ContextCard';

const mockContexts = [
  {
    id: 1,
    name: 'Contexte Mathématiques Avancées',
    description: "Contexte pour l'enseignement des mathématiques niveau licence",
    school: 'Université Paris-Saclay',
    country: 'France',
    level: 'Licence 1',
    subject: 'Mathématiques',
    students: 3,
    objectives: 3,
  },
  {
    id: 2,
    name: 'Contexte Physique Quantique',
    description: 'Contexte pour la physique quantique niveau master',
    school: 'École Polytechnique',
    country: 'France',
    level: 'Master 1',
    subject: 'Physique Quantique',
    students: 3,
    objectives: 3,
  },
];

export const ContextList = () => {
  return (
    <div className="space-y-5">
      {mockContexts.map((context) => (
        <ContextCard key={context.id} context={context} />
      ))}
    </div>
  );
};
