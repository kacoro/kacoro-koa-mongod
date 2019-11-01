import React, { Component,Suspense, lazy  } from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@app/redux/store.js';
import path from 'path'
import { RoutesIndex, routes } from '@app/router/index.jsx';
import getData from '@app/common/getData';

import { ChunkExtractor } from '@loadable/server'
const statsFile = path.resolve('./dist/loadable-stats.json')
const extractor = new ChunkExtractor({ statsFile })


async function clientRoute(ctx, next) {
   
    for (let item of routes) {
        if (item.path == ctx.url) {
            const data = await getData(ctx.url);
            console.log(data)
            await ctx.render('index', {
                root: renderToString(
                    extractor.collectChunks(<Provider store={store}>
                        <StaticRouter location={ctx.url} context={data} >
                            <RoutesIndex {...store.getState()} />
                        </StaticRouter>
                    </Provider>)
                ),
                helmet:Helmet.renderStatic()
            });
            break;
        }
    }
    await next();
}

export default clientRoute;
