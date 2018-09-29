import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../../components/tab';
import DataList from '../../components/data-list';
import axios from 'axios';

import withPage from '../../components/withPage';

import List from './list';
import cx from 'classnames';
import './index.scss';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: null
        }
    }
    toggleType(index) {
        this.setState({ idx: index });
    }
    getData(type) {
        return new Promise((resolve, reject) => {
            axios.get('https://cnodejs.org/api/v1/topics', {
                params: {
                    tab: type || 'all'
                }
            })
                .then(res => {
                    resolve(res.data.data);
                })
                .catch(err => {
                    console.log(err, 'err')
                })
        })
    }
    render() {
        const foots = [
            { title: '首页' },
            { title: '消息' },
            { title: '设置' },
            { title: '我的' }
        ];
        const tabs = [
            { title: '全部', id: 'all' },
            { title: '精华', id: 'good' },
            { title: '分享', id: 'share' },
            { title: '问答', id: 'ask' },
            { title: '招聘', id: 'job' },
        ];
        const { idx } = this.state;
        return (
            <div className='page-index'>
                <Tab tabs={tabs} toggleType={this.toggleType.bind(this)} />
                {
                    tabs.map((value, keys) => {
                        return (
                            <div className={cx('page-list', keys === idx ? '' : 'block-none')} key={keys + '10'}>
                                <DataList
                                    fetch={this.getData.bind(this, value.id)}
                                    id={keys + value.id}
                                    ref={list => (this.dataList = list)}
                                    render={(data, index, saveData) => {
                                        return <List item={data} key={`${index}${value.id}`} saveData={saveData}/>
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Index
