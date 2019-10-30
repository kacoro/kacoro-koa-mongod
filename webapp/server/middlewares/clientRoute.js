import React, { Component,Suspense, lazy  } from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../src/redux/store.js';
import path from 'path'
import { RoutesIndex, routes } from '../../src/router/index.jsx';
import getData from '../../src/common/getData';

import { ChunkExtractor } from '@loadable/server'
const statsFile = path.resolve('./dist/loadable-stats.json')
const extractor = new ChunkExtractor({ statsFile })


async function clientRoute(ctx, next) {
    console.log(ctx.url)
    for (let item of routes) {
       
        if (item.path == ctx.url) {
            const data = await getData(ctx.url);
            await ctx.render('index', {
                root: renderToString(
                    extractor.collectChunks(<Provider store={store}>
                        <StaticRouter location={ctx.url} context={data}>
                            <RoutesIndex {...store.getState()} />
                        </StaticRouter>
                    </Provider>)
                )
            });
            break;
        }
    }
    await next();
}

export default clientRoute;
