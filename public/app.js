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
  /**
   * @param {Event} event
   */
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector('input[type=search]').value;
    // TODO
  },
  // for debugging purpose
  api: API,
};

window.app = app;
