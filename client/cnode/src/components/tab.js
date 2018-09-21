import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/tab.scss';
import cx from 'classnames';
import session from './session';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: session.get('TAB_INDEX') || 0
        }
    }
    static PropTypes = {
        tabs: PropTypes.array
    }
    componentDidMount() {
        const { ids } = this.state;
        this.props.toggleType(ids);
    }
    toggleTab(index) {
        if (index === this.state.ids) return null;
        session.set('TAB_INDEX', index);
        this.setState({ ids: index }, () => {
            this.props.toggleType(index);
        })
    }
    render() {
        const { ids } = this.state;
        const { tabs } = this.props;
        return (
            <div className='tab-position'>
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
            </div>
        )
    }
}