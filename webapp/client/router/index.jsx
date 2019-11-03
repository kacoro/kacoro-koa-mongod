import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from "react-router-dom";
import App from '@app/pages/App'
import loadable from '@loadable/component'

import asyncComponent from '@app/components/AsyncComponent'

// const AsyncFirst = asyncComponent(() => import(/* webpackChunkName: 'First' */ '@app/pages/First'));
// const AsyncSecond = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/pages/Second'));
// const AsyncThird = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/pages/Third'));

const AsyncFirst = loadable(() => import('@app/pages/First'));
const AsyncSecond = loadable(() => import('@app/pages/Second'));
const AsyncThird = loadable(() => import('@app/pages/Third'));
const AsyncSignin = loadable(() => import('@app/pages/Signin'));
const AsyncSignup = loadable(() => import('@app/pages/Signup'));
const AsyncNews = loadable(() => import('@app/pages/News'));
const AsyncNewsDetail = loadable(() => import('@app/pages/News/Detail'));
// const AsyncFirst2 = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/pages/First'), 
//  })

//  const AsyncSecond = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/pages/Second'), 
//  })
//  const AsyncThird = Loadable({
//   loading: <div>loading...</div>,
//   loader: () => import( '@app/pages/Third'), 
//  })


//  const routes = [
//   { path: '/', component: withRouter(AsyncFirst) },
//   { path: '/first', component: withRouter(AsyncFirst)  },
//   { path: '/second', component: withRouter(AsyncSecond)  },
//   { path: '/third', component: withRouter(AsyncThird) }
//   ];

// import First from '@app/pages/First';
// import Second from '@app/pages/Second';
// import Third from '@app/pages/Third';

// const routes = [
//   { path: '/', component: withRouter(First) },
//   { path: '/first', component: withRouter(First) },
//   { path: '/second', component: withRouter(Second)},
//   { path: '/third', component: withRouter(Third) }
//   ];

const routes = [
  {
    path: "/",exact:true,
 
    component: withRouter(AsyncNews)
  },
  {
    path: "/news/:id",exact:true,
    component: withRouter(AsyncNewsDetail)
  },
  {
    path: "/news",exact:true,
    component: withRouter(AsyncNews),
   
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
    path: '/second',
    component: withRouter(AsyncSecond),
  },
  {
    path: '/third',
    component: withRouter(AsyncThird)
  },
  {
    path: '/signin', 
    component: withRouter(AsyncSignin)
  },
  {
    path: '/signup',
    component: withRouter(AsyncSignup)
  }
];

class RoutesIndex extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log(this.props)
    const { ...props } = this.props
    return (
      <div className="app-container">

        <Switch>
          <App  {...props}>
            {routes.map((item, index) => (
              <Route key={index} path={item.path}  exact={item.exact}   render={() =>
                <item.component {...props} />} />
            ))}
           
          </App>
        </Switch>

      </div>
    );
  }
}

export { RoutesIndex, routes }