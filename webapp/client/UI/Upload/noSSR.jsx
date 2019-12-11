import loadable from '@loadable/component'
const NoSSRWrapper = loadable(() => import(/* webpackChunkName: "Upload" */'./'),{ssr:false});
export default NoSSRWrapper;