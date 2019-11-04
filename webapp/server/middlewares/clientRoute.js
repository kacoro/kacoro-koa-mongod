import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import reactRouter, { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux';
import store from '@app/redux/store.js';
import path from 'path'
import { RoutesIndex, routes } from '@app/router/index.jsx';
import getData from '@app/common/getData';

import { ChunkExtractor } from '@loadable/server'
const statsFile = path.resolve('./dist/loadable-stats.json')
const extractor = new ChunkExtractor({ statsFile })

global.__SERVER__=true;
global.__CLIENT__ = false;

async function clientRoute(ctx, next) {
  console.log(ctx)
  var pathname = ctx.req._parsedUrl.pathname
  const search = ctx.req._parsedUrl.search
 
  const branch = matchRoutes(routes,pathname)
 
  if (branch.length > 0) {
    var data = {}
    var com = await branch[0].route.component
    if (com.load) { // 如果是动态加载的
      com = await com.load()
      com = com.default
    }

    if (com.getInitialProps) {
     
      // const opt = {
      //   query: ctx.query,
      //   params:  branch[0].match
      // }
      console.log()
      const opt = {
        isSSR:true,
        search:search,
        params:branch[0].match.params}
      data = await com.getInitialProps(opt)
    }
    //参数带入

    //数据注水
    const propsData = `<textarea id="krs-server-render-data-BOX" style="display:none" >${JSON.stringify(data)}</textarea>`;
    const jsx = extractor.collectChunks(<Provider store={store}><StaticRouter location={ctx.url} ><RoutesIndex {...store.getState()} context={data} /></StaticRouter></Provider>)
    const html = renderToString(jsx)
    const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();
    const linkTags = extractor.getLinkTags()
    const styleTags = extractor.getStyleTags()
    await ctx.render('index', {
      root: html,
      scriptTags: scriptTags,
      linkTags: linkTags,
      styleTags: styleTags,
      helmet: Helmet.renderStatic(),
      propsData: propsData
    });
  }
  await next();
}

function matchRoutes(routes, pathname,
  /*not public API*/
  branch) {
  if (branch === void 0) {
    branch = [];
  }

  routes.some(function (route) {

    var match = route.path ? reactRouter.matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
      : reactRouter.Router.computeMatch(pathname); // use default "root" match

    if (match) {
      branch.unshift({
        route: route,
        match: match
      });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });
  return branch;
}

export default clientRoute;
