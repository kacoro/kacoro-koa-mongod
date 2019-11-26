require('@babel/polyfill');
require('source-map-support').install();
require('@babel/register')({
    presets: [['@babel/preset-env', {
        "targets": {"node": "current"},
        "useBuiltIns": "usage",
        "corejs": "3.0.0"
        }],"@babel/preset-typescript"],
});
require('@babel/core').transform('code', {
    plugins: [
     '@babel/plugin-transform-runtime','@babel/plugin-transform-modules-commonjs',
     "@babel/plugin-proposal-class-properties","@babel/plugin-proposal-throw-expressions","@babel/plugin-syntax-dynamic-import",
     "@babel/plugin-syntax-import-meta","@babel/plugin-proposal-export-namespace-from"
    ]
});



const convert = require('koa-convert');


const app = require('./app.js').default;
const router = require('./routes').default;


const port = process.env.port || 5300;


app.use(router.routes());
app.use(router.allowedMethods());

// app.set('port', port);

app.listen(port, () => {
  console.log('listen on: http://127.0.0.1:' + port);
});

module.exports = app;
