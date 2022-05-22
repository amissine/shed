import { showModal, } from '../utils.mjs' // {{{1

class ShowBrowserIpView { // {{{1
  constructor () { // {{{2
  }

  append (line) { // {{{2
    let divAppend = document.getElementById('joinSHEXappend')
    if (line.startsWith('- creating')) {
      document.getElementById('joinSHEXalt').style.display = 'none'
      divAppend.style.display = 'block'
    }
    let innerHTML = divAppend.innerHTML
    innerHTML += '<br>' + line
    divAppend.innerHTML = innerHTML
  }

  show (ips) { // {{{2
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
