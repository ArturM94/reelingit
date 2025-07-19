import { AccountPage } from '../components/AccountPAge.js';
import { HomePage } from '../components/HomePage.js';
import { LoginPage } from '../components/LoginPage.js';
import { MovieDetailsPage } from '../components/MovieDetailsPage.js';
import { MoviesPage } from '../components/MoviesPage.js';
import { RegistorPage } from '../components/RegisterPage.js';

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
  {
    path: '/account/register',
    component: RegistorPage,
  },
  {
    path: '/account/login',
    component: LoginPage,
  },
  {
    path: '/account/',
    component: AccountPage,
  },
];
