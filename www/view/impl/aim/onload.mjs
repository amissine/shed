import { showModal, } from './utils.mjs' // {{{1

class OnLoadView { // {{{1
  constructor (presenter) { // {{{2
  }

  buyHEXA () { // {{{2
    console.log(this.userInfo, this.localSessionInfo)

    showModal('mcBuyHEXA', () => alert('XA'))
  }

  networkChanged (elementSelectNetwork) { // {{{2
    process.presenter.dispatchEvent(
      new CustomEvent(
        'networkChanged', 
        { 
          detail: {
            network: elementSelectNetwork.value
          }
        }
      )
    )
  }

  show (userInfo, localSessionInfo) { // called by OnLoadPresenter.#onInit {{{2
    Object.assign(this, { userInfo, localSessionInfo })
  }
  // }}}2
}

function classP (mot) { // make or take {{{1
  let m = mot.memo ? mot.memo.value : 'take'
  switch (m) {
    case 'Offer':
      return mot.takesCached.length > 0 ? 'offer-claimed' : 'offer-claimable';

    case 'Request':
      return mot.takesCached.length > 0 ? 'request-claimed' : 'request-claimable';
  }
  m = mot.make.memo.value
  switch (m) {
    case 'Offer':
      return mot.claimable ? 'ask-claimable' : mot.claimed ? 'ask-claimed' : 'ask-reclaimed';

    case 'Request':
      return mot.claimable ? 'bid-claimable' : mot.claimed ? 'bid-claimed' : 'bid-reclaimed';
  }
}

// }}}1
export { OnLoadView, }
