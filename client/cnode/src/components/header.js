import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/header.scss';
import styled from "styled-components";

function Header(props) {
    const { title, backAction, rightNavComp, router } = props;
    return (
        <div className='header-position'>
            <div className='header-component'>
                <div className='header-left' onClick={() => backAction(router || window.history)}>
                    back
                    </div>
                <div className='header-content'>{title}</div>
                {rightNavComp && React.createElement(rightNavComp)}
            </div>
        </div>
    )
}

const DefaultRightNavComp = () => null;

const defaultBackAction = history => {
    // const isHashHistory = Array.isArray(history.routers);
    // if (Browser.app) {
    //     // return Interaction.sendInteraction("toLastVC", []);
    // } else {
    history.go(-1);
    // }
}

Header.defaultProps = {
    title: "hello world",
    rightNavComp: DefaultRightNavComp,
    backAction: defaultBackAction
}

const Wrapper = styled.div`
  color: #fff;
  z-index: 11;
`;

const Content = styled.div`
  background: #1e88d2;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
`;


function noop() { }

export default function withHeader(InnerComponent) {
    return class HeaderComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                title: 'hello world',
                rightNavComp: undefined,
                backAction: undefined
            }
        }
        static defaultProps = {
            innerRef: noop,
            hideHeader: false
        };
        setTitle(title) {
            this.setState({ title });
        }
        setRightNavComp(component) {
            this.setState({ rightNavComp: component })
        }
        setBackAction(action) {
            this.setState({ backAction: action })
        }
        render() {
            return (
                <Wrapper>
                    {!this.props.hideHeader && <Header {...this.state} {...this.props} />}
                    <Content>
                        <InnerComponent
                            {...this.props}
                            setTitle={this.setTitle.bind(this)}
                            setRightNavComp={this.setRightNavComp.bind(this)}
                            setBackAction={this.setBackAction.bind(this)}
                            ref={this.props.innerRef.bind(this)}
                        />
                    </Content>
                </Wrapper>
            )
        }
    }
}

