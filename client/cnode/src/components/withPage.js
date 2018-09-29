import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import LoadingIndicator from "react-loading-indicator";
import withHeader from './header';

const Wrapper = styled.div`
    flex:1;
    display:flex;
    flex-direction:column
`

const LoadingWrapper = styled.div`
    flex:1
    display:flex;
    flex-direction:column
`

const page = Wrapper => {
    return class WrapperComponent extends Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            console.log(this.props,'props page')
        }
        setTitle(title){
            this.props.setTitle({title});
        }
        sttRightNavComponent(component){
            this.props.setRightNavComp({rightNavComp:component})
        }
        setBackAction(action) {
            this.props.setBackAction({ backAction: action });
        }
        render(){
            return (
               <Wrapper 
                {...this.props}
               />
            )
        }
    }
}

export default withHeader(page)

