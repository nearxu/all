import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../../components/tab';

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    toggleType(index) {
        console.log(index, 'index');
    }
    render() {
        const foots = [
            { title: '首页' },
            { title: '消息' },
            { title: '设置' },
            { title: '我的' }
        ]
        return (
            <div className='page-index'>
                <Tab toggleType={this.toggleType.bind(this)} />
            </div>
        )
    }
}