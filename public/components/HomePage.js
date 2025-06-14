import { API } from '../services/API.js';
import { MovieItem } from './MovieItem.js';

/**
 * HomePage Web Component
 * @extends HTMLElement
 */
export class HomePage extends HTMLElement {
  async render() {
    const topMovies = await API.getTopMovies();
    renderMoviesInList(topMovies, document.querySelector('#top-10 ul'));

    const randomMovies = await API.getRandomMovies();
    renderMoviesInList(randomMovies, document.querySelector('#random ul'));

    /**
     * @param {Array<Object>} movies
     * @param {HTMLUListElement} ul
     */
    function renderMoviesInList(movies, ul) {
      ul.innerHTML = '';
      movies.forEach((movie) => {
        const li = document.createElement('li');
        li.appendChild(new MovieItem(movie));
        ul.appendChild(li);
      });
    }
  }

  connectedCallback() {
    const template = document.getElementById('template-home');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }
}

customElements.define('home-page', HomePage);
