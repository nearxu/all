import { Route, Switch, HashRouter } from 'react-router-dom'
import React from 'react'

import Home from '../containers/home'
import Admin from '../admin'
import Shop from '../containers/shop'
import Food from '../containers/food'
import Article from '../containers/article'

import Login from '../pages/login.js'
import Register from '../pages/register.js'
import UserList from '../pages/userlist.js'

const RouterConfig = (
  <HashRouter>
    <Switch>
      <Route
        path="/"
        render={() => (
          <Admin>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/article/index" component={Article} />
              <Route path="/shop/shopList" component={Shop} />
              <Route path="/shop/foodList" component={Food} />
              <Route path="/admin/login" component={Login} />
              <Route path="/admin/register" component={Register} />
              <Route path="/admin/userlist" component={UserList} />
            </Switch>
          </Admin>
        )}
      />
    </Switch>
  </HashRouter>
)

export default RouterConfig
