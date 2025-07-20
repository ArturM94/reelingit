export const API = {
  baseURL: '/api',
  getTopMovies: async () => {
    return API.fetch('/movies/top');
  },
  getRandomMovies: async () => {
    return API.fetch('/movies/random');
  },
  /**
   * @returns {Array<{ name: string; id: number }>}
   */
  getGenres: async () => {
    return API.fetch('/genres');
  },
  /**
   * @param {number} id
   */
  getMovieById: async (id) => {
    return API.fetch(`/movies/${id}`);
  },
  /**
   * @param {string} q
   * @param {string} order
   * @param {string} genre
   */
  searchMovies: async (q, order, genre) => {
    return API.fetch('/movies/search', { q, order, genre });
  },
  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  register: async (name, email, password) => {
    return API.send('/account/register', { name, email, password });
  },
  /**
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    return API.send('/account/authenticate', { email, password });
  },
  getFavorites: async () => {
    return API.fetch('/account/favorites');
  },
  getWatchlist: async () => {
    return API.fetch('/account/watchlist');
  },
  /**
   * @param {number} movieId
   * @param {'favorite' | 'watchlist'} collection 
   * @returns 
   */
  saveToCollection: async (movieId, collection) => {
    return API.send('/account/save-to-collection', {
      movieId,
      collection,
    });
  },
  /**
   * @param {string} serviceName
   * @param {any} data
   */
  send: async (serviceName, data) => {
    try {
      const response = await fetch(API.baseURL + serviceName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: window.app.Store.jwt
            ? `Bearer ${window.app.Store.jwt}`
            : null,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      return result;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * @param {string} serviceName
   * @param {any} args
   */
  fetch: async (serviceName, args) => {
    const queryString = args ? new URLSearchParams(args).toString() : '';

    try {
      const response = await fetch(
        API.baseURL + serviceName + '?' + queryString,
        {
          headers: {
            Authorization: window.app.Store.jwt
              ? `Bearer ${window.app.Store.jwt}`
              : null,
          },
        }
      );
      const result = await response.json();

      return result;
    } catch (e) {
      console.error(e);
    }
  },
};
