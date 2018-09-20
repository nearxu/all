import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/header.scss';

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    static PropTypes = {
        title: PropTypes.string
    }
    render() {
        const { title } = this.props;
        return (
            <div className='header-component'>
                <div className='header-left'>back</div>
                <div className='header-content'>{title}</div>
                <div className='header-right'></div>
            </div>
        )
    }
}