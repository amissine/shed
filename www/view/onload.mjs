import { OnLoadView, } from './impl/aim/onload.mjs' // {{{1

function init (elementSelectNetwork) { // {{{1
  const detail = { network: elementSelectNetwork.value }
  process.view = new OnLoadView(process.presenter = new OnLoadPresenter())
  process.presenter.dispatchEvent(new CustomEvent('init', { detail }))
}

// }}}1
export { init, }
