import loadable from '@loadable/component'
const NoSSRWrapper = loadable(() => import(/* webpackChunkName: "Editor" */'./'),{ssr:false});
export default NoSSRWrapper;