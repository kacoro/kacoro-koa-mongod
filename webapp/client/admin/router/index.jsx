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
const AsyncNewsEdit = loadable(() => import('@app/admin/pages/News/Edit'));

const AsyncNewsCate = loadable(() => import('@app/admin/pages/NewsCate'));
const AsyncNewsCateEdit = loadable(() => import('@app/admin/pages/NewsCate/Edit'));

const AsyncUser = loadable(() => import('@app/admin/pages/User'));
const AsyncUserEdit = loadable(() => import('@app/admin/pages/User/Edit'));

const AsyncComment = loadable(() => import('@app/admin/pages/Comment'));
const AsyncAsyncCommentEdit = loadable(() => import('@app/admin/pages/Comment/Edit'));

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
    path: "/news/create",exact:true,
    component: withRouter(AsyncNewsEdit)
  },
  {
    path: "/news/edit/:id",exact:true,
    component: withRouter(AsyncNewsEdit)
  },
  {
    path: "/newscate",exact:true,
    component: withRouter(AsyncNewsCate),
  },
  {
    path: "/newscate/create",exact:true,
    component: withRouter(AsyncNewsCateEdit)
  },
  {
    path: "/newscate/edit/:id",exact:true,
    component: withRouter(AsyncNewsCateEdit)
  },
  {
    path: "/user",exact:true,
    component: withRouter(AsyncUser),
  },
  {
    path: "/user/create",exact:true,
    component: withRouter(AsyncUserEdit)
  },
  {
    path: "/user/edit/:id",exact:true,
    component: withRouter(AsyncUserEdit)
  },
  {
    path: "/comment",exact:true,
    component: withRouter(AsyncComment),
  },
  {
    path: "/comment/create",exact:true,
    component: withRouter(AsyncAsyncCommentEdit)
  },
  {
    path: "/comment/edit/:id",exact:true,
    component: withRouter(AsyncAsyncCommentEdit)
  },
  
];
routes.map( (item)=>{
   item.path = prefix + item.path
   return item
})


export default routes 