import React, { Component  } from 'react'
import { StaticRouter as Router,Switch, Route,Redirect} from "react-router-dom";
import App from '@app/views/App'
import asyncComponent from '@app/components/AsyncComponent'
const AsyncFirst = asyncComponent(() => import('@app/views/First'));
const AsyncSecond = asyncComponent(() => import('@app/views/Second'));
const AsyncThird = asyncComponent(() => import('@app/views/Third'));
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
            <Route exact path="/" component={AsyncFirst}  />
            <Route path="/first" component={AsyncSecond} />
            <Route path="/second" component={AsyncSecond} />
            <Route path="/third" component={AsyncThird} />
            <Redirect to="/"/>
            </Switch>
        </App>
      </Router>
    )
  }
}
export default ConfigRouter;