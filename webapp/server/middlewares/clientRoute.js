import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import reactRouter,{ match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux';
import store from '@app/redux/store.js';
import path from 'path'
import { RoutesIndex, routes } from '@app/router/index.jsx';
import getData from '@app/common/getData';

import { ChunkExtractor } from '@loadable/server'
const statsFile = path.resolve('./dist/loadable-stats.json')
const extractor = new ChunkExtractor({ statsFile })



async function clientRoute(ctx, next) {
    
    
    // match({ routes, location: ctx.url },async (error, redirectLocation, renderProps) => {
    //     console.log(error)
    // })
    //     console.log(error, redirectLocation, renderProps)
    //     // if (error) {
    //     //     ctx.status = 500
    //     //     ctx.body =  error.message
           
    //     // } else if (redirectLocation) {
    //     //     ctx.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //     // } else if (renderProps) {
    //     //     await ctx.render('index', {
    //     //                     root: renderToString(
    //     //                         extractor.collectChunks(<Provider store={store}><StaticRouter location={ctx.url} context={data} ><RoutesIndex {...renderProps} /></StaticRouter></Provider>)
    //     //                     ),
    //     //                     helmet:Helmet.renderStatic()
    //     //                 });
    //     // } else {
    //     //     ctx.status = 404
    //     //     ctx.body = 'Not found'
    //     // }
    //   })
   
 
    // for (let item of routes) {
    //     if (item.path == ctx.url) {
            // const data = await getData(ctx.url);
            console.log(ctx.url)
            const branch = matchRoutes(routes,ctx.url)
            var data = {}
            console.log(branch)
            var com = await branch[0].route.component
            if(com.load){ // 如果是动态加载的
                com = await com.load()
                com = com.default
            }
            console.log(com.getInitialProps)
            if(com.getInitialProps){
                data = await com.getInitialProps()
            }
          
           
            console.log(data)
            //数据注水
            const propsData = `<textarea id="krs-server-render-data-BOX" style="display:none" >${JSON.stringify(data)}</textarea>`;
            const chunks = extractor.collectChunks(<Provider store={store}><StaticRouter location={ctx.url} ><RoutesIndex {...store.getState()}   context={data} /></StaticRouter></Provider>)
           
            await ctx.render('index', {
                root: renderToString(chunks),
                helmet:Helmet.renderStatic(),
                propsData:propsData
            });
            // break;
    //     }
    // }
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
