import type { Context, Objective } from '../types/types';

export const mockObjectives: Objective[] = [
  {
    id: 1,
    label: 'Amelioration continue',
  },
];
export const mockContexts: Context[] = [
  {
    id: 1,
    name: 'Contexte Mathématiques Avancées',
    description: "Contexte pour l'enseignement des mathématiques niveau licence",
    school: 'Université Paris-Saclay',
    country: 'France',
    level: 'Licence 1',
    subject: 'Mathématiques',
    twins: 3,
    objectives: mockObjectives,
    academic_year: '2022',
  },
  {
    id: 2,
    name: 'Contexte Physique Quantique',
    description: 'Contexte pour la physique quantique niveau master',
    school: 'École Polytechnique',
    country: 'France',
    level: 'Master 1',
    subject: 'Physique Quantique',
    twins: 3,
    objectives: mockObjectives,
    academic_year: '2022',
  },
];
