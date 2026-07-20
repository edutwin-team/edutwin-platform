import { DEFAULT_PAGE_META, PAGE_META } from '../../src/config/pageMeta';

describe('PAGE_META', () => {
  it('définit les métadonnées de la page d’accueil', () => {
    expect(PAGE_META['/']).toEqual({
      title: 'Accueil',
      context: "Bienvenue sur l'espace EduTwin",
    });
  });

  it('définit les métadonnées du tableau de bord', () => {
    expect(PAGE_META['/dashboard'].title).toBe('Tableau de bord');
    expect(PAGE_META['/dashboard'].context).toContain('jumeaux');
  });

  it('couvre les pages principales', () => {
    expect(Object.keys(PAGE_META)).toEqual(
      expect.arrayContaining(['/', '/dashboard', '/twins', '/quizzes', '/settings', '/profile'])
    );
  });
});

describe('DEFAULT_PAGE_META', () => {
  it('fournit un titre et un contexte par défaut', () => {
    expect(DEFAULT_PAGE_META.title).toBe('Page');
    expect(DEFAULT_PAGE_META.context).toContain('EduTwin');
  });
});
