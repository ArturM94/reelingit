import { HomePage } from '../components/HomePage.js';
import { MovieDetailsPage } from '../components/MovieDetailsPage.js';
import { MoviePage } from '../components/MoviePage.js';

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
    component: MoviePage,
  },
];
