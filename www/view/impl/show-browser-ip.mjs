import { showModal, } from '../utils.mjs' // {{{1

class ShowBrowserIpView { // {{{1
  constructor () { // {{{2
  }

  show (ips) { // {{{2
    console.log(ips) // ips.ipv4.ip 174.211.177.108 - KEEPS CHANGING!
    showModal(
      'showBrowserIP', 
      () => console.log(process.view),
      'ip-info',
      ips.ipv4.ip
    )
    let email = document.getElementById('ip-email').href
    email = email.replace('XXX',
      `Please add my IP ${ips.ipv4.ip} to your list of known ones. Thanks!`
    )
    document.getElementById('ip-email').href = email
  }

  // }}}2
}

// }}}1
export { ShowBrowserIpView, }
