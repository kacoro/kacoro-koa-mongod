import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch,withRouter } from "react-router-dom";
import App from '@app/views/App'

// import Loadable from 'react-loadable';

import asyncComponent from '@app/components/AsyncComponent'

const AsyncFirst = asyncComponent(() => import(/* webpackChunkName: 'First' */ '@app/views/First'));
const AsyncSecond = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Second'));
const AsyncThird = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Third'));


// const AsyncFirst = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import(/* webpackChunkName: 'First' */ '@app/views/First'), 
//  })
 
//  const AsyncSecond = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import(/* webpackChunkName: 'Second' */ '@app/views/Second'), 
//  })
//  const AsyncThird = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import(/* webpackChunkName: 'Third' */ '@app/views/Third'), 
//  })

 const routes = [
  { path: '/', component: AsyncFirst },
  { path: '/first', component: AsyncFirst },
  { path: '/second', component: AsyncSecond },
  { path: '/third', component: AsyncThird }
  ];

// import First from '@app/views/First';
// import Second from '@app/views/Second';
// import Third from '@app/views/Third';

// const routes = [
//   { path: '/', component: withRouter(First) },
//   { path: '/first', component: withRouter(First) },
//   { path: '/second', component: withRouter(Second)},
//   { path: '/third', component: withRouter(Third) }
//   ];



class RoutesIndex extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    const { ...props } = this.props
    return (
      <div className="app-container">
        <App>
          <Switch>
              {routes.map((item, index) => (
                 <Route key={index} path={item.path} exact render={() => <item.component {...props} />} />
              ))}
          </Switch>
          </App>
      </div>
    );
  }
}

export { RoutesIndex, routes }