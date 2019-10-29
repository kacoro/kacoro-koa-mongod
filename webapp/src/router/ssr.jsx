import React, { Component  } from 'react'
import { StaticRouter as Router,Switch} from "react-router-dom";
import App from '@app/views/App'
import Routes from './index'
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
                <Routes></Routes>
            </Switch>
        </App>
      </Router>
    )
  }
}
export default ConfigRouter;