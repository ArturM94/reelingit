import { API } from './services/API.js';

import './components/HomePage.js';
import './components/AnimatedLoading.js';
import './components/MovieDetailsPage.js';
import './components/YouTubeEmbed.js';
import { Router } from './services/Router.js';

window.addEventListener('DOMContentLoaded', (event) => {
  app.Router.init();
});

/** @type {{ Router: typeof Router, search: (event: Event) => void, api: typeof API }} */
const app = {
  Router,
  showError: (message = 'There was an error.', goHome = true) => {
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
  // for debugging purpose
  api: API,
};

window.app = app;
