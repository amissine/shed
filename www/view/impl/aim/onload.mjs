import { showModal, } from './utils.mjs' // {{{1

class OnLoadView { // {{{1
  constructor (presenter) { // {{{2
  }

  buyHEXA () { // {{{2
    debug && console.log(this.userInfo, this.localSessionInfo)

    if (!this.userInfo && !this.localSessionInfo) {
      showModal('mcBuyHEXA', () => alert(TODO))
    } else {
      alert(TODO)
    }
  }

  buyHEXA_continue () { // store user info locally, continue {{{2
    let kids = document.getElementById('mcBuyHEXA_ui').children
    let keys = ['greeting', 'email', 'sk'], values = [], i = 0
    for (let kid of kids) {
      if (kid.tagName != 'DIV') {
        break;
      }
      let k = keys[i++], v = kid.lastElementChild.value; values.push(v)
      console.log(k, v)
    }

    // Store user info - keys, values - locally

    // Continue
    document.getElementById('mcBuyHEXA_yesno').style = 'display:none'
    document.getElementById('mcBuyHEXA_ui').style = 'display:none'
    document.getElementById('mcBuyHEXA_DEX').style = 'display:block'
    document.getElementById('mcBuyHEXA_order').style = 'display:block'
    if (process.session.network == 'test') {
      let detail = { 
        traders: {
          count: 2, // Math.ceil(Math.random() * 3) - 1 to 3,
          power: [0.2, 0.3], // traders: Pushy(0.3), Humble(0.2)
        },
      }
      process.presenter.dispatchEvent(
        new CustomEvent('tradingHEXA_start', { detail })
      )
    }
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

  orderbookShow (line) { // {{{2
    let dexConsole = document.getElementById('mcBuyHEXA_DEX_textarea')
    dexConsole.textContent = line + '\n' + dexConsole.textContent
    console.log(line)

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
