import { LearningStyleMap, PreferredContentTypeMap } from '../../src/utils/twins';

describe('PreferredContentTypeMap', () => {
  it.each([
    ['text', 'Texte', 'badge-info'],
    ['video', 'Vidéo', 'badge-warning'],
    ['quiz', 'Quiz', 'badge-success'],
    ['image', 'Image', 'badge-secondary'],
    ['interactive', 'Interactif', 'badge-accent'],
    ['mixed', 'Mixte', 'badge-neutral'],
  ] as const)('définit le libellé et la couleur pour %s', (key, label, color) => {
    expect(PreferredContentTypeMap[key].label).toBe(label);
    expect(PreferredContentTypeMap[key].color).toBe(color);
  });
});

describe('LearningStyleMap', () => {
  it.each([
    ['visual', 'Visuel'],
    ['practical', 'Pratique'],
    ['theoretical', 'Théorique'],
    ['exercise_based', 'Exercices'],
    ['mixed', 'Mixte'],
  ] as const)('définit le libellé pour %s', (key, label) => {
    expect(LearningStyleMap[key].label).toBe(label);
  });
});
