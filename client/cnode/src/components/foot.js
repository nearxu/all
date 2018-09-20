import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/foot.scss';
import { withRouter } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0
        }
    }
    static PropTypes = {
        foots: PropTypes.Array
    }
    toggleRouter(index) {
        if (index === this.state.idx) return null;
        let result = '';
        switch (index) {
            case 0:
                result = '/';
                break;
            case 1:
                result = '/news';
                break;
            case 2:
                result = '/setting';
                break;
            case 3:
                result = '/me';
                break;
            default:
                result = '/';
        }
        this.setState({ idx: index }, () => {
            this.props.history.push(result);
        })
    }
    render() {
        const { foots } = this.props;
        return (
            <div className='foot-component'>
                <div className='flex-foot'>
                    {
                        foots.map((item, index) => {
                            return (<div className='foot' key={index} onClick={this.toggleRouter.bind(this, index)}>
                                {/* <img src={item.url} /> */}
                                <span>{item.title}</span>
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Index);