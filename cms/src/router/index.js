import { Router, Route, Switch, HashRouter } from "react-router-dom";
import React, { Component } from "react";

import Home from "../containers/home";
import Admin from "../admin";

const RouterConfig = (
  <HashRouter>
    <Switch>
      <Route
        path="/"
        render={() => (
          <Admin>
            <Switch>
              <Route path="/home" component={Home} />
            </Switch>
          </Admin>
        )}
      />
    </Switch>
  </HashRouter>
);

export default RouterConfig;
