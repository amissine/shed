import { showModal, } from '../utils.mjs' // {{{1

class ShowBrowserIpView { // {{{1
  constructor () { // {{{2
  }

  show (ips) { // {{{2
    console.log(ips)
    alert(ips.ipv4.ip) // 174.211.177.108
  }

  // }}}2
}

// }}}1
export { ShowBrowserIpView, }
