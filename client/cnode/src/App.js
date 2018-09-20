import React, { Component } from 'react';
import 'lib-flexible/flexible.js'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Index from './pages/index';
import News from './pages/news';
import Setting from './pages/setting';
import Me from './pages/me';

import Header from './components/header';
import Foot from './components/foot';

class App extends Component {
  render() {
    const foots = [
      { title: '首页' },
      { title: '消息' },
      { title: '设置' },
      { title: '我的' }
    ]
    return (
      <Router>
        <div>
          <Header title='我的首页' />
          <Route exact path='/' component={Index} />
          <Route exact path='/news' component={News} />
          <Route exact path='/setting' component={Setting} />
          <Route exact path='/me' component={Me} />
          <Foot foots={foots} />
        </div>
      </Router>
    )
  }
}
export default App
