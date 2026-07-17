import { matchPath } from 'react-router-dom';

export const appRoutes = [
  '/',
  '/dashboard',
  '/twins',
  '/profile',
  '/quizzes',
  '/settings',
  '/simulation',
  '/contexts',
];

export const isNotFoundRoute = (pathname: string): boolean => {
  return !appRoutes.some((route) => matchPath(route, pathname));
};
