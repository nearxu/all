import React, { Component } from 'react';

import { DataListSession } from './data-list-session';
const LIST_DATA = 'LIST_DATA';
const LIST_PAGE_POSITION = 'LIST_PAGE_POSITION';


type Props = {
    fetch: (pageIndex: number, pageSize: number) => Promise<Array<any>>,
    pageIndex: number,
    pageSize: number,
    render: (data: any, index?: number, saveData?: () => void) => React.Node,
    // EmptyTip?: React.ComponentType<any>,
    id: string,
    forceRefresh: boolean
}

type State = {
    data: Array<any>,
    hasNext: boolean,
    pageIndex: number
}
export default class DataListProvider extends React.Component<Props, State> {
    state = {
        data: [],
        hasNext: false,
        pageIndex: this.props.pageIndex
    }

    static defaultProps = {
        pageIndex: 0,
        pageSize: 10,
        // EmptyTip: EmptyListTip,
        id: window.location.href,
        forceRefresh: false
    }
    listSession: DataListSession;

    constructor(props: Props) {
        super(props);
        this.listSession = new DataListSession(props.id);
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.removeListSession);
        if (this.listSession.get(LIST_DATA) && !this.props.forceRefresh) {
            this.recoveryFromSession();
        } else {
            this.fetch();
        }
    }
    removeListSession() {
        this.listSession.remove(LIST_DATA);
    }
    recoveryFromSession() {
        const { data, hasNext, pageIndex } = this.listSession.get(LIST_DATA);
        this.setState({ data, hasNext, pageIndex }, () => {
            const position = this.listSession.get(LIST_PAGE_POSITION);
            window.scroll(0, position);
        })
    }
    fetch = (pageIndex?: number = this.state.pageIndex, pageSize?: number = this.props.pageSize) => {
        this.props.fetch(pageIndex, pageSize).then(data => {
            this.setState({ data: this.state.data.concat(data) }, () => {
                this.saveData();
            });
            const hasNext = data.length === pageSize;
            this.setState({ hasNext });
        })
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.removeListSession);
    }
    refresh() {
        this.setState({ data: [], hasNext: false, pageIndex: this.props.pageIndex }, () => {
            this.fetch()
        })
    }
    saveData() {
        this.listSession.save(LIST_DATA, this.state);
        this.listSession.save(LIST_PAGE_POSITION, window.scrollY);
    }
    render() {
        const { data, hasNext } = this.state;
        const { render } = this.props;
        return (
            <React.Fragment>
                {
                    data.map((item, index) => render(item, index, this.saveData))
                }
                {/* <Pagination
                    hasNext={hasNext}
                    onPageChange={this.nextPage}
                    pageIndex={this.state.pageIndex}
                /> */}
            </React.Fragment>
        );
    }

}