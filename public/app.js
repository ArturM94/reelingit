import { API } from './services/API.js';

import './components/HomePage.js';
import './components/AnimatedLoading.js';
import './components/MovieDetailsPage.js';
import './components/YouTubeEmbed.js';

window.app = {
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
