
import session from './session';

export class DataListSession {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    getPageData = () => {
        return session.get(this.id) || {};
    }
    save = (type: string, data: any) => {
        const pageData = this.getPageData();
        pageData[type] = data;
        session.set(this.id, pageData);
    }
    get = (type: string) => {
        const pageData = this.getPageData();
        return pageData[type];
    }
    remove = (type: string) => {
        const pageData = this.getPageData();
        delete pageData[type];
        session.set(this.id, pageData);
    }
    clear = () => {
        session.clear(this.id);
    }
}