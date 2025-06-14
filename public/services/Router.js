import { routes } from './Routes.js';

export const Router = {
  init() {
    window.addEventListener('popstate', () => {
      Router.go(location.pathname, false);
    });

    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const href = a.getAttribute('href');
        Router.go(href);
      });
    });

    Router.go(location.pathname + location.search);
  },
  /**
   * @param {string} route
   * @param {boolean} addToHistory
   */
  go(route, addToHistory = true) {
    if (addToHistory) {
      history.pushState(null, '', route);
    }

    /** @type {HTMLElement} */
    let pageElement = null;

    const routePath = route.includes('?') ? route.split('?')[0] : route;

    for (const r of routes) {
      if (typeof r.path === 'string' && r.path === routePath) {
        pageElement = new r.component();
        break;
      }

      if (r.path instanceof RegExp) {
        const match = r.path.exec(route);
        if (match) {
          pageElement = new r.component();
          const params = match.slice(1);
          pageElement.params = params;
          break;
        }
      }
    }

    if (!pageElement) {
      pageElement = document.createElement('h1');
      pageElement.textContent = 'Page not found';
    }

    /** @type {HTMLElement} */
    const oldPage = document.querySelector('main').firstElementChild;

    if (oldPage) {
      oldPage.style.viewTransitionName = 'old';
    }

    pageElement.style.viewTransitionName = 'new';

    function updatePage() {
      document.querySelector('main').innerHTML = '';
      document.querySelector('main').appendChild(pageElement);
    }

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updatePage();
      });
    } else {
      updatePage();
    }
  },
};
