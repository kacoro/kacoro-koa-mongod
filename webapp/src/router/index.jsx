import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import App from '../views/App'


import asyncComponent from './AsyncComponent'

const AsyncFirst = asyncComponent(() => import('../views/First'));
const AsyncSecond = asyncComponent(() => import('../views/Second'));
const AsyncThird = asyncComponent(() => import('../views/Third'));

class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log('wo xuan rang le')
    return (
      <Router basename="/webapp">
        <App>
        
          <Switch>
            <Route exact path="/" component={AsyncFirst} />
            <Route path="/second" component={AsyncSecond}/>
            <Route path="/third" component={AsyncThird} />
            <Redirect to="/" />
          </Switch>
          
        </App>
      </Router>
    )
  }
}
export default ConfigRouter;