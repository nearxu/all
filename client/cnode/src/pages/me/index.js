import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withHeader from '../../components/header';
// import withPage from '../../components/withPage';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // console.log(this.props,'props me')
        this.props.setTitle('cnode me')
    }
    render() {
        return (
            <div style={{"marginTop":"100px"}}>
                <div>hello me</div>
            </div>
        )
    }
}

export default withHeader(Index)