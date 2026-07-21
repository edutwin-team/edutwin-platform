import { sidebarLinks } from '../../src/config/navigation';

describe('sidebarLinks', () => {
  it('expose 7 entrées de navigation', () => {
    expect(sidebarLinks).toHaveLength(7);
  });

  it('contient les sections essentielles', () => {
    const names = sidebarLinks.map((link) => link.name);
    expect(names).toEqual([
      'Tableau de bord',
      'Contexte pédagogique',
      'Jumeau numérique',
      'Quiz',
      'Simulation',
      'Profil utilisateur',
      'Paramètres',
    ]);
  });

  it('associe chaque entrée à un chemin et une icône', () => {
    sidebarLinks.forEach((link) => {
      expect(link.path).toMatch(/^\//);
      expect(typeof link.icon).toBe('function');
    });
  });
});
