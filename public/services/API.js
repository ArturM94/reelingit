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
   * @param {string} serviceName
   * @param {any} args
   */
  fetch: async (serviceName, args) => {
    const queryString = args ? new URLSearchParams(args).toString() : '';

    try {
      const response = await fetch(
        API.baseURL + serviceName + '?' + queryString
      );
      const result = await response.json();

      return result;
    } catch (e) {
      console.error(e);
    }
  },
};
