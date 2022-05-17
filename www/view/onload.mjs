import { OnLoadView, } from './impl/onload.mjs' // {{{1
import { ShowBrowserIpView, } from './impl/show-browser-ip.mjs'

function init () { // {{{1
  if (myMap == null) { // handle RefererNotAllowedMapError (RNAME)
    const detail = { path: './', pre: '35fda39b809a08973aa2c054842e716d4f4ed9ab' }
    process.view = new ShowBrowserIpView(process.presenter = new ShowBrowserIpPresenter())
    process.presenter.dispatchEvent(new CustomEvent('rname', { detail }))
    return;
  }
/* See also:
https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter
https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
*/
  const detail = { TODO: 'Make use of me' }
  process.view = new OnLoadView(process.presenter = new OnLoadPresenter())
  process.presenter.dispatchEvent(new CustomEvent('init', { detail }))
}

// }}}1
export { init, }
