import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


import asyncComponent from '@app/components/AsyncComponent'

const AsyncFirst = asyncComponent(() => import('@app/views/First'));
const AsyncSecond = asyncComponent(() => import('@app/views/Second'));
const AsyncThird = asyncComponent(() => import('@app/views/Third'));

import First from '@app/views/First';
import Second from '@app/views/Second';
import Third from '@app/views/Third';
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
// const routes = [
//   { path: '/', component: First },
//   { path: '/first', component: First },
//   { path: '/second', component: Second },
//   { path: '/third', component: Third }
//   ];

const routes = [
  { path: '/', component: AsyncFirst },
  { path: '/first', component: AsyncFirst },
  { path: '/second', component: AsyncSecond },
  { path: '/third', component: AsyncThird }
  ];

class RoutesIndex extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log('wo xuan rang le')
    const { ...props } = this.props
    return (
      <div className="app-container">
          <Switch>
              {routes.map((item, index) => (
                 <Route key={index} path={item.path} exact render={() => <item.component {...props} />} />
              ))}
          </Switch>
      </div>
    );
  }
}

export { RoutesIndex, routes }