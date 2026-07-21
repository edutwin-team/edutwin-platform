import { ContentSourceType } from '../../src/types';
import { quizSourceLabel } from '../../src/utils/quiz/quizSourceLabel';

describe('quizSourceLabel', () => {
  it('retourne Manuel pour une création manuelle', () => {
    expect(quizSourceLabel(ContentSourceType.MANUAL)).toBe('Manuel');
  });

  it('retourne Import pour un fichier importé', () => {
    expect(quizSourceLabel(ContentSourceType.IMPORT_FILE)).toBe('Import');
  });

  it('retourne Inconnu pour une source non reconnue', () => {
    expect(quizSourceLabel('unknown' as typeof ContentSourceType.MANUAL)).toBe('Inconnu');
  });
});
