import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/tab.scss';
import cx from 'classnames';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: 0
        }
    }
    toggleTab(index) {
        if (index === this.state.ids) return null;
        this.setState({ ids: index }, () => {
            this.props.toggleType(index);
        })
    }
    render() {
        const tabs = [
            { title: '全部', id: 'all' },
            { title: '精华', id: 'good' },
            { title: '分享', id: 'share' },
            { title: '问答', id: 'ask' },
            { title: '招聘', id: 'job' },
        ]
        const { ids } = this.state;
        return (
            <div className='tab-component'>
                {
                    tabs.map((item, index) => {
                        return (
                            <span
                                key={index}
                                className={cx(ids === index ? 'active' : '')}
                                onClick={this.toggleTab.bind(this, index)}
                            >
                                {item.title}
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}