import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from "react-router-dom";
import App from '@app/admin/pages/App'
import loadable from '@loadable/component'

import asyncComponent from '@app/components/AsyncComponent'

// const AsyncFirst = asyncComponent(() => import(/* webpackChunkName: 'First' */ '@app/pages/First'));
// const AsyncSecond = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/pages/Second'));
// const AsyncThird = asyncComponent(() => import(/* webpackChunkName: 'Second' */ '@app/pages/Third'));

const prefix = "/admin"
const AsyncHome = loadable(() => import('@app/admin/pages/Home'));
const AsyncNews = loadable(() => import('@app/admin/pages/News'));
const AsyncNewsDetail = loadable(() => import('@app/admin/pages/News/Detail'));


var routes = [
  {
    path: "",exact:true,
    component: withRouter(AsyncHome)
  },
  {
    path: "/news",exact:true,
    component: withRouter(AsyncNews),
  },
  {
    path: "/news/:id",exact:true,
    component: withRouter(AsyncNewsDetail)
  },
];
routes.map( (item)=>{
   item.path = prefix + item.path
   return item
})


export default routes 