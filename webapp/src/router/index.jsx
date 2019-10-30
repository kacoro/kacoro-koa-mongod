import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch,withRouter } from "react-router-dom";
import App from '@app/views/App'

import Loadable from 'react-loadable';

import asyncComponent from '@app/components/AsyncComponent'

// const AsyncFirst = asyncComponent(() => import(/* webpackChunkName: 'First' */ '@app/views/First'));
// const AsyncSecond = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Second'));
// const AsyncThird = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Third'));

const AsyncFirst = lazy(() => import('@app/views/First'));
const AsyncSecond = lazy(() => import('@app/views/Second'));
const AsyncThird = lazy(() => import('@app/views/Third'));
// const AsyncFirst2 = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/views/First'), 
//  })
 
//  const AsyncSecond = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/views/Second'), 
//  })
//  const AsyncThird = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/views/Third'), 
//  })

 const routes = [
  { path: '/', component: withRouter(AsyncFirst) },
  { path: '/first', component: withRouter(AsyncFirst)  },
  { path: '/second', component: withRouter(AsyncSecond)  },
  { path: '/third', component: withRouter(AsyncThird) }
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
    console.log(this.props)
    return (
      <div className="app-container">
        <App>
          <Switch>
              {routes.map((item, index) => (
                 <Route key={index} path={item.path} exact  render={() =><Suspense fallback={<div>Loading...</div>}>  <item.component {...props} />  </Suspense>} />
              ))}
          </Switch>
          </App>
      </div>
    );
  }
}

export { RoutesIndex, routes }