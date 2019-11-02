import React, { Component,Suspense, lazy  } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch,withRouter } from "react-router-dom";
import App from '@app/views/App'
import loadable from '@loadable/component'

import asyncComponent from '@app/components/AsyncComponent'

// const AsyncFirst = asyncComponent(() => import(/* webpackChunkName: 'First' */ '@app/views/First'));
// const AsyncSecond = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Second'));
// const AsyncThird = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/views/Third'));

const AsyncFirst = loadable(() => import('@app/views/First'));
const AsyncSecond = loadable(() => import('@app/views/Second'));
const AsyncThird = loadable(() => import('@app/views/Third'));
const AsyncSignin = loadable(() => import('@app/views/Signin'));
const AsyncSignup = loadable(() => import('@app/views/Signup'));
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


//  const routes = [
//   { path: '/', component: withRouter(AsyncFirst) },
//   { path: '/first', component: withRouter(AsyncFirst)  },
//   { path: '/second', component: withRouter(AsyncSecond)  },
//   { path: '/third', component: withRouter(AsyncThird) }
//   ];

import First from '@app/views/First';
// import Second from '@app/views/Second';
// import Third from '@app/views/Third';

// const routes = [
//   { path: '/', component: withRouter(First) },
//   { path: '/first', component: withRouter(First) },
//   { path: '/second', component: withRouter(Second)},
//   { path: '/third', component: withRouter(Third) }
//   ];

const routes = [
          {
              path: "/",
              exact: true,
              component: withRouter(First)
          },
          {
              path: "/first",
              component: withRouter(AsyncFirst),
              routes: [
                  {
                      path: "/child/:id/grand-child",
                      component: withRouter(AsyncFirst)
                  }
              ]
          },
          {
              path: '/second', exact: true,
              component: withRouter(AsyncSecond),
          },
          {
              path: '/third', exact: true,
              component: withRouter(AsyncThird)
          },
          {
            path: '/signin', exact: true,
            component: withRouter(AsyncSignin)
        },
        {
          path: '/signup', exact: true,
          component: withRouter(AsyncSignup)
      }
];

class RoutesIndex extends Component {
  constructor(props) {
    super(props);
  };

  render () {
    console.log(this.props)
    const {...props} = this.props
    return (
      <div className="app-container">
       
          <Switch>
          <App  {...props}>
              {routes.map((item, index) => (
                 <Route key={index} path={item.path} exact render={() => 
                 <item.component {...props} />} />
              ))}
                </App>
          </Switch>
        
      </div>
    );
  }
}

export { RoutesIndex, routes }