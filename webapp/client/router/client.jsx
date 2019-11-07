import React, { Component  } from 'react'
import { BrowserRouter as Router,Switch} from "react-router-dom";

import Connect from '../pages'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
// import store from '../redux/store';
import configureStore from '../redux/configureStore';
const { persistor, store } = configureStore()
// const persistor = persistStore(store);


class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };
 
  render () {
    
    return (
      <Provider store={store} >
         <PersistGate loading={null} persistor={persistor}>
          <Router>
                  <Connect  {...this.props}>
                  </Connect>
          </Router>
      </PersistGate>
      </Provider>
    )
  }
}
export default ConfigRouter;
