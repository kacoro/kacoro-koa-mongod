import loadable from '@loadable/component'
const NoSSRWrapper = loadable.lib(() => import('./'),{ssr:false});
export default NoSSRWrapper;