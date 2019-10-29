import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


import asyncComponent from '@app/components/AsyncComponent'

const AsyncFirst = asyncComponent(() => import('@app/views/First'));
const AsyncSecond = asyncComponent(() => import('@app/views/Second'));
const AsyncThird = asyncComponent(() => import('@app/views/Third'));

// const AsyncFirst = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import('@app/views/First'), 
//  })
 
//  const AsyncSecond = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import('@app/views/Second'), 
//  })
//  const AsyncThird = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import('@app/views/Third'), 
//  })

class ConfigRouter extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log('wo xuan rang le')
    return [<Route exact path="/" component={AsyncFirst} key='1' />,
    <Route path="/second" component={AsyncSecond} key='2'/>,
    <Route path="/third" component={AsyncThird} key='3'/>,
    <Redirect to="/" key='4'/>]
            
  }
}
export default ConfigRouter;