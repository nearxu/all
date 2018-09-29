import React, { Component } from 'react';
import './list.scss'
import {withRouter} from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props);
    }
    toggleDetail(id){
        this.props.saveData();
        console.log(this.props,'props');
        this.props.history.push('/detail/'+id)
    }
    render() {
        const { item } = this.props;
        return (
            <div className='list' onClick={this.toggleDetail.bind(this,item.id)}>
                <div className='listleft'>
                    <img  src ={item.author.avatar_url} />
                    <span>{item.author.loginname}</span>
                </div>
                <div className='listright'>
                    <span>{item.title}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(List)