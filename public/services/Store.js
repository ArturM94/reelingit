const Store = {
  jwt: null,
  get loggedIn() {
    return this.jwt !== null;
  },
};

const jwt = localStorage.getItem('jwt');

if (jwt) {
  Store.jwt = jwt;
}

const proxiedStore = new Proxy(Store, {
  set: (target, prop, value) => {
    if (prop === 'jwt') {
      target[prop] = value;

      if (value === null) {
        localStorage.removeItem('jwt');
      } else {
        localStorage.setItem('jwt', value);
      }
    }

    return true;
  },
});

export default proxiedStore;
