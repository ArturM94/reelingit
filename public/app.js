import { API } from './services/API.js';

import './components/HomePage.js';
import './components/AnimatedLoading.js';
import './components/MovieDetailsPage.js';
import './components/YouTubeEmbed.js';
import { Router } from './services/Router.js';
import Store from './services/Store.js';

window.addEventListener('DOMContentLoaded', (event) => {
  app.Router.init();
});

/** @type {{ Router: typeof Router, search: (event: Event) => void, api: typeof API }} */
const app = {
  Router,
  Store,
  showError: (message = 'There was an error.', goHome = false) => {
    /** @type {HTMLDialogElement} */
    const dialog = document.getElementById('alert-modal');
    dialog.showModal();
    document.querySelector('#alert-modal p').textContent = message;

    if (goHome) {
      app.Router.go('/');
    }
  },
  closeError: () => {
    /** @type {HTMLDialogElement} */
    const dialog = document.getElementById('alert-modal');
    dialog.close();
  },
  /**
   * @param {Event} event
   */
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector('input[type=search]').value;
    app.Router.go(`/movies?q=${q}`);
  },
  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    const genre = urlParams.get('genre') ?? '';
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    const order = urlParams.get('order') ?? '';
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  register: async (event) => {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById(
      'register-password-confirm'
    ).value;

    const errors = [];

    if (name.length < 4) {
      errors.push('Enter your complete name.');
    }

    if (password.length < 7) {
      errors.push('Enter your password with at least 7 characters.');
    }

    if (password != passwordConfirm) {
      errors.push("Password don't match.");
    }

    if (email.length < 4) {
      errors.push('Enter your complete email.');
    }

    if (errors.length === 0) {
      const response = await API.register(name, email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go('/account/');
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join(' '));
    }
  },
  login: async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-password').value;
    const password = document.getElementById('login-password').value;

    const errors = [];

    if (password.length < 7) {
      errors.push('Enter your password with at least 7 characters.');
    }

    if (email.length < 4) {
      errors.push('Enter your complete email.');
    }

    if (errors.length === 0) {
      const response = await API.login(email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go('/account/');
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join(' '));
    }
  },
  // for debugging purpose
  api: API,
};

window.app = app;
