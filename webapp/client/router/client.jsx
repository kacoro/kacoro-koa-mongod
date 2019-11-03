import React, { Component  } from 'react'
import { BrowserRouter as Router,Switch} from "react-router-dom";

import Connect from '../pages'
import { Provider } from 'react-redux';
import store from '../redux/store';
class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    
    return (
      <Provider store={store} >
      <Router>
              <Connect  {...this.props}>
                
              </Connect>
      </Router>
      </Provider>
    )
  }
}
export default ConfigRouter;
