import { HomePage } from '../components/HomePage.js';
import { MovieDetailsPage } from '../components/MovieDetailsPage.js';
import { MoviesPage } from '../components/MoviesPage.js';

/** @type {Array<{ path: string; component: HTMLElement }>} */
export const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: /\/movies\/(\d+)/,
    component: MovieDetailsPage,
  },
  {
    path: '/movies',
    component: MoviesPage,
  },
];
