import loadable,{lazy } from '@loadable/component'
const NoSSRWrapper = lazy.lib(() => import('./'),{ssr:false});
export default NoSSRWrapper;