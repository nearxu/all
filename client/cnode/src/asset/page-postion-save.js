import session from "./session";

const PAGE_POSITION_SESSION = "PAGE_POSITION_SESSION";

export default class PagePositionSession {
  constructor(path) {
    this.path = path;
  }

  getAllSession() {
    return session.get(PAGE_POSITION_SESSION) || {};
  }

  find() {
    const pagePositionSession = this.getAllSession();
    return pagePositionSession[this.path];
  }

  save() {
    const height = window.scrollY;
    if (!height) return;
    const pagePositionSession = this.getAllSession();
    session.set(PAGE_POSITION_SESSION, {
      ...pagePositionSession,
      [this.path]: height
    });
  }

  recovery() {
    const height = this.find();
    if (!height) return;
    window.scroll(0, height);
  }
}
