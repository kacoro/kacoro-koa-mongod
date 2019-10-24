import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import App from '../views/App'
import First from '../views/First'


class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log('wo xuan rang le')
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={First} />
            <Redirect to="/" />
          </Switch>
        </App>
      </Router>
    )
  }
}
export default ConfigRouter;