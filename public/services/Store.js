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
      localStorage.setItem('jwt', value);
    }

    return true;
  },
});

export default proxiedStore;
