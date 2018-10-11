import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withHeader from '../../components/header';
import axios from 'axios';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:null
        }
    }
    componentDidMount(){
        this.props.setTitle('cnode me')
        console.log(this.props,'props')
        this.getDetail()
    }
    getDetail(){
        axios.get(`https://cnodejs.org/api/v1//topic/${this.props.match.params.id}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({data:res.data.data});
                })
                .catch(err => {
                    console.log(err, 'err')
                })
    }
    render() {
        let {data} = this.state;
        console.log(data,'data')
        if(!data) return <div />
        return (
            <div style={{"marginTop":"100px"}}>
                <div>{data.content}</div>
            </div>
        )
    }
}

export default withHeader(Index)