import { appRoutes, isNotFoundRoute } from '../../src/utils/routes/routes';

describe('appRoutes', () => {
  it('contient les routes principales de l’application', () => {
    expect(appRoutes).toEqual(
      expect.arrayContaining([
        '/',
        '/dashboard',
        '/twins',
        '/profile',
        '/quizzes',
        '/settings',
        '/simulation',
        '/contexts',
      ])
    );
  });
});

describe('isNotFoundRoute', () => {
  it.each([
    '/',
    '/dashboard',
    '/twins',
    '/profile',
    '/quizzes',
    '/settings',
    '/simulation',
    '/contexts',
  ])('retourne false pour %s', (pathname) => {
    expect(isNotFoundRoute(pathname)).toBe(false);
  });

  it.each(['/unknown', '/admin', '/dashboard/extra', '/twins/42/edit'])(
    'retourne true pour %s',
    (pathname) => {
      expect(isNotFoundRoute(pathname)).toBe(true);
    }
  );
});
