import React, { Component  } from 'react'
import { BrowserRouter as Router,Switch} from "react-router-dom";

import Connect from '../views'
import { Provider } from 'react-redux';
import store from '../redux/store';
class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log('wo xuan rang le')
    return (
      <Provider store={store}>
      <Router >
              <Connect>
                
              </Connect>
      </Router>
      </Provider>
    )
  }
}
export default ConfigRouter;
