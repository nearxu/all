import parse from "url-parse";
import http from "../request";
import cookie from "./cookie";
import session from "./session";

const request = http("/lotto");

const TOKEN_KEY = "token";
const USER_INFO_KEY = "USER_INFO_KEY";
const PREV_TOKEN_KEY = "token";

export function getToken() {
  return session.get(PREV_TOKEN_KEY);
}

export function setAuth(token, userInfo) {
  if (!token) return undefined;
  cookie.set(TOKEN_KEY, token);
  session.set(TOKEN_KEY, token);
  if (!userInfo) return undefined;
  session.set(USER_INFO_KEY, userInfo);
  session.set("userInfo", userInfo);
}

export function setToken(token) {
  cookie.set(TOKEN_KEY, token);
  session.set(TOKEN_KEY, token);
}

export function getUserInfo() {
  const userInfo = session.get(USER_INFO_KEY);
  if (!userInfo) return session.get("userInfo");
  return userInfo;
}

export function isLogin() {
  const token = getToken();
  if (!token) return Promise.reject(new Error("Not login"));
  return new Promise((resolve, reject) => {
    request
      .post("/member/token/status", { token }, { prefix: "/lotto/h5/v1.0" })
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function isInWhitelist() {
  const token = getToken();
  if (!token) return Promise.reject(new Error("Not login user"));
  return new Promise((resolve, reject) => {
    request
      .post('/order/whitelist', { token }, { prefix: "/lotto/h5/v1.0" })
      .then(res => {
        if (res.data && res.data === 1) {
          resolve();
        } else {
          reject('not in whitelist');
        }
      }).catch(reject);
  });
}

const URL_TYPE = {
  LOCATION: 0,
  PATHNAME: 1
};

export function goLogin(next = window.location.href) {
  const urlType = next.startsWith("http")
    ? URL_TYPE.LOCATION
    : URL_TYPE.PATHNAME;
  let pathname;
  if (urlType === URL_TYPE.LOCATION) {
    pathname = parse(next).pathname;
  } else {
    pathname = next;
  }
  const nextUrl = pathname.startsWith("/accounts") ? "/" : next;
  window.location.href = `/account.html?next=${encodeURIComponent(nextUrl)}`;
}

export function getAsyncToken() {
  return new Promise((resolve, reject) => {
    getTimerToken(resolve, reject);
  });
}

const MAX_GET_TOKEN_RETRY_TIMES = 150;

function getTimerToken(callback, reject) {
  let times = 0;
  const timer = setInterval(() => {
    const token = getToken();
    times += 1;
    if (!token && times === MAX_GET_TOKEN_RETRY_TIMES) {
      return reject({ code: "40001" });
    }
    if (token || times >= 50) {
      callback(token);
      clearInterval(timer);
    }
  }, 20);
}
