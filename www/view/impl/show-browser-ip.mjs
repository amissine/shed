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

  show (userInfo, ips) { // {{{2
    if (userInfo) {
      console.log(userInfo, ips)
      let content
      if (userInfo.ipAddress.filter(addr => addr == ips.ipv4.ip).length > 0) {
        showModal('accountIPaInProgress',
          () => console.log(process.view),
          'ip-info-wait', ips.ipv4.ip
        )
        content = document.getElementById('accountIPaInProgress')
      } else {
        showModal('associateThisAddressToo',
          () => console.log(process.view),
          'ip-info-add', ips.ipv4.ip
        )
        content = document.getElementById('associateThisAddressToo')
      }
      let html = content.innerHTML
      html = html.replace('XXX', userInfo.greeting)
      html = html.replace('XXX', userInfo.greeting)
      html = html.replace('XXX', userInfo.emailAddress)
      content.innerHTML = html
      return;
    }
    showModal(
      'showBrowserIP', 
      () => console.log(process.view),
      'ip-info', ips.ipv4.ip
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
