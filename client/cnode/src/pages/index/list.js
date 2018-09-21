import React, { Component } from 'react';

export default class List extends Component {
    constructor(props) {
        super(props);
    }
    // componentWillReceiveProps(props, nextProps) {
    //     if (JSON.stringify(props.item) === JSON.stringify(nextProps.item)) {
    //         return null;
    //     } else {
    //         this.props.save();
    //     }
    // }
    render() {
        const { item } = this.props;
        return (
            <div>{item.title}</div>
        )
    }
}