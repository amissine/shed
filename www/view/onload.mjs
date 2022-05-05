import { OnLoadView, } from './impl/onload.mjs' // {{{1
import { ShowBrowserIpView, } from './impl/show-browser-ip.mjs'

/******************************************** {{{1
import { OnLoadPresenter, } from '../presenter/onload.mjs'
import { delay, } from '../presenter/utils.mjs'

class Popup extends google.maps.OverlayView { // {{{1
  constructor(position, content) { // {{{2
    super();
    this.position = position;
    content.classList.add("popup-bubble");

    // This zero-height div is positioned at the bottom of the bubble.
    const bubbleAnchor = document.createElement("div");

    bubbleAnchor.classList.add("popup-bubble-anchor");
    bubbleAnchor.appendChild(content);
    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement("div");
    this.containerDiv.classList.add("popup-container");
    this.containerDiv.appendChild(bubbleAnchor);
    // Optionally stop clicks, etc., from bubbling up to the map.
    Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  onAdd() { // {{{2
    this.getPanes().overlayMouseTarget.appendChild(this.containerDiv);
  }
  onRemove() { // {{{2
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }
  draw() { // {{{2
    const divPosition = this.getProjection().fromLatLngToDivPixel(
      this.position
    );
    // Hide the popup when it is far out of view.
    const display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? "block"
        : "none";

    if (display === "block") {
      this.containerDiv.style.left = divPosition.x + "px";
      this.containerDiv.style.top = divPosition.y + "px";
    }

    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  } // }}}2
}

class OnLoadGuestView extends OnLoadView { // {{{1
  constructor () { // {{{2
    super()
  }

  show () { // {{{2
    this.pan2currentPosition()
  }
  welcome (position, makerType) { // {{{2
    let p = super.welcome(position, makerType)
    let popup = new Popup(p, document.getElementById(makerType))
    popup.setMap(myMap)
    popup.containerDiv.addEventListener('click', e => showModal('getUserInfo'))
  }
  // }}}2
}

class OnLoadUser1stView extends OnLoadView { // {{{1
  constructor () { // {{{2
    super()
  }

  async acceptBid (botIndex) { // {{{2
    let close
    let promise = new Promise((r, e) => {
      process.demo.acceptBid = r
      close = e
    })
    let content = document.getElementById('confirmBidAccept')
    content.children[1].children[2].firstChild.textContent =
      process.presenter.bots[botIndex].bid.description
    showModal('confirmBidAccept', close)
    return await promise.then(r => true, e => false);
  }

  biddingBotHide (bot) { // {{{2
    let bidder = document.getElementById(`bidder${bot.i}`)
    bidder.style.display = 'none'
  }
  
  biddingBotShow (i, lat, lng) { // {{{2
    let p = new google.maps.LatLng(lat, lng)
    let popup = new Popup(p, document.getElementById(`bidder${i}`))
    let fc2 = popup.containerDiv.firstChild.firstChild
    fc2.style.cursor = 'not-allowed'
    fc2.style.width = '140px'
    popup.setMap(myMap)
    return fc2;
  }

  onBidAccept (bot, payment) { // {{{2
    let content = document.getElementById('payingBidder')
    let text = content.children[1].textContent
    text = text.replace('XXX', payment).replace('XXX', bot.i).replace('XXX', bot.i)
    content.children[1].textContent = text
    showModal('payingBidder')
  }

  onRequestTimeout () { // {{{2
    let requestor = document.getElementById(process.presenter.makerType())
    requestor.style.display = 'none'
  }

  updateStatusRemove (bot = null) { // {{{2
    document.getElementById('payingBidderCogs').style.display = 'none'
    let rbc = document.getElementById('removingBidderCogs')
    rbc.style.display = 'block'
    let text = rbc.firstChild.textContent
    text = bot == null ? ' DONE ' : ` Removing bidder ${bot.i}...`
    rbc.firstChild.textContent = text
  }

  requestBroadcast () { // {{{2
    let fc2 = this.popup.containerDiv.firstChild.firstChild
    let fc1 = fc2.firstElementChild, fc = fc1.firstChild
    fc1.removeChild(fc1.firstChild)
    fc1.removeChild(fc1.firstChild)
    fc1.append(' 3:00')
    this.countdown = fc1
    fc2.style.width = '80px'
    fc2.style.cursor = 'pointer'
    this.popup.containerDiv.addEventListener('click', e => showModal('req1Intro'))
    delay(1500).then(r => this.popup.containerDiv.click())
  }

  show () { // {{{2
    this.pan2currentPosition(process.presenter.makerType())
  }

  showBot (i, lat, lng) { // {{{2
    let marker = new google.maps.Marker({ position: { lat, lng }, map: myMap }); 
    marker.setIcon('gratz.png')
    const infowindow = new google.maps.InfoWindow({
      //content: process.demo.bid[i],
      content: '<p>Checking existing requests...</p>',
    }); 
    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(myMap, marker);
    }); 
    Object.assign(process.presenter.bots[i], { marker, infowindow })
  }

  updateStatus (i = null) { // {{{2
    let sbc = document.getElementById('simulateBiddersCogs')
    sbc.firstChild.textContent = i == null ? ' DONE ' 
      : ` Creating bidding bot ${++i} of 4... `
  }

  welcome (position, makerType) { // {{{2
    let p = super.welcome(position, makerType)
    this.popup = new Popup(p, document.getElementById(makerType))
    let fc2 = this.popup.containerDiv.firstChild.firstChild
    fc2.style.cursor = 'not-allowed'
    fc2.style.width = '180px'
    this.popup.setMap(myMap)
    let fc1 = fc2.firstElementChild, fc = fc1.firstChild
    fc.data += process.presenter.userInfo.greeting + '... '
    process.presenter.make()
  }
  // }}}2
}

class OnLoadUserView extends OnLoadView { // {{{1
  constructor () { // {{{2
    super()
    let userInfo = process.presenter.getUserInfo()
    userInfo.part3 = true // the next run completes the demo
    process.presenter.setUserInfo(userInfo)
  }

  part2EndShow (bidTakenTimestamp) { // {{{2
    let content = document.getElementById('part2End')
    let text = content.children[1].textContent
    content.children[1].textContent = text.replace('XXX', bidTakenTimestamp)
    showModal(
      'part2End',
      () => location.reload()
    )
  }

  requestingBotShow (lat, lng) { // {{{2
    let p = new google.maps.LatLng(lat, lng)
    let popup = new Popup(p, document.getElementById('bot4'))
    let fc2 = popup.containerDiv.firstChild.firstChild
    fc2.style.width = '200px'
    let fc2lec = fc2.lastElementChild
    let tc = fc2lec.textContent
    fc2lec.textContent = tc.replace('XXX', process.demo.requestDescription) +
      '. Click here to bid!'
    popup.setMap(myMap)
    popup.containerDiv.addEventListener(
      'click',
      process.presenter.bidOnDemoRequest
    )
    return fc2lec;
  }

  show () { // {{{2
    let userInfo = process.presenter.getUserInfo()
    userInfo.listen4FOs && process.presenter.listen4FOs()
    userInfo.listen4FRs && process.presenter.listen4FRs()
    this.pan2currentPosition('listener')
  }

  welcome (position, userRole) { // {{{2
    let p = super.welcome(position, userRole)
    let popup = new Popup(p, document.getElementById(userRole))
    popup.setMap(myMap)
    popup.containerDiv.addEventListener(
      'click', 
      event => showModal(
        'makeRequest',
        process.presenter.pokeRequestor
      )
    )
    let fc2 = popup.containerDiv.firstChild.firstChild
    fc2.style.width = '180px'
    let fc1 = fc2.children[1]
    fc1.textContent = process.presenter.userInfo.greeting + fc1.textContent
  }
  // }}}2
}

class OnLoadUserViewPart3 extends OnLoadView { // {{{1
  constructor () { // {{{2
    super()
  }

  show () { // {{{2
    showModal('testClawbacks')
  }
  // }}}2
}

***********************************************/ // {{{1
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
