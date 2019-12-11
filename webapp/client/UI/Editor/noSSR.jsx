import loadable from '@loadable/component'
const NoSSRWrapper = loadable(() => import('./'),{ssr:false});
export default NoSSRWrapper;