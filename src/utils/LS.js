// Always need to wrap localStorage in a try/catch block because
// it can throw an exception in some browsers (e.g. Safari)
const LS = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      return localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  },
  removeItem: (key) => {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  },
};

export default LS;
