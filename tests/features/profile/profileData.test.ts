import { twinProfilePageData } from '../../../src/features/profile/data/profileData';

describe('twinProfilePageData', () => {
  it('expose un titre et une description', () => {
    expect(twinProfilePageData.heading).toContain('Profil Élève');
    expect(twinProfilePageData.description).toContain('jumeau numérique');
  });

  it('contient des scores académiques', () => {
    expect(twinProfilePageData.academic.scores).toHaveLength(3);
    expect(twinProfilePageData.academic.scores[0].label).toBe('Mathématiques');
  });

  it('contient des préférences et difficultés', () => {
    expect(twinProfilePageData.preferences.tags.length).toBeGreaterThan(0);
    expect(twinProfilePageData.recurringDifficulties).toHaveLength(2);
    expect(twinProfilePageData.evaluationHistory).toHaveLength(3);
  });
});
