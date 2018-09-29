import Cookies from "js-cookie";

export default {
  get(key, raw = false) {
    const value = Cookies.get(key);
    if (raw) return value;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  set(key, value) {
    if (typeof value === "undefined") return undefined;
    if (typeof value === "number" || typeof value === "string") {
      Cookies.set(key, value);
    } else {
      Cookies.set(key, JSON.stringify(value));
    }
  },
  remove(key) {
    Cookies.remove(key);
  }
};
