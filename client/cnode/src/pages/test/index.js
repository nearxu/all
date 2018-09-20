import React, { Component } from 'react';
import './test.scss';
import Http from '../../server/http';


class Child extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('did mount child');
        // this.getBlogTitle();
    }
    getBlogTitle() {
        Http.get('/category/allTitle')
            .then(res => {
                console.log(res, 'res');
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        console.log('render child!!!');
        const { index } = this.props;
        return (
            <div>hello Child {index}</div>
        )
    }
}

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    componentDidMount() {
        console.log('did mount father');
    }
    render() {
        console.log('render idnex');
        return (
            <div className='index'>
                <p>hello idnex</p>
                <Child index={this.state.index} />
            </div>
        )
    }
}