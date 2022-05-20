import { showModal, } from '../utils.mjs' // {{{1

class GoogleMapsView { // {{{1
  constructor () { // {{{2
  }

  pan2currentPosition () { // {{{2
    let infoWindow = new google.maps.InfoWindow()

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    if (!navigator.geolocation) { // Browser doesn't support Geolocation
      return handleLocationError(false, infoWindow, myMap.getCenter());
    }
    navigator.geolocation.getCurrentPosition(
      position => this.welcome(position),
      error => handleLocationError(true, infoWindow, myMap.getCenter())
    )
  }

  welcome (position) { // {{{2
    let p = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    )
    myMap.setCenter(p)
    myMap.setZoom(11)

    process.env.lat = position.coords.latitude.toString() 
    process.env.lng = position.coords.longitude.toString()

    return p;
  }
  // }}}2
}

class OnLoadView extends GoogleMapsView { // {{{1
  #addUI () { // {{{2
    let historyButton = document.createElement('button')
    historyButton.textContent = 'Show History of Makes'
    historyButton.classList.add("custom-map-control-button")
    myMap.controls[google.maps.ControlPosition.TOP_CENTER].push(historyButton)
    this.historyButton = historyButton
    historyButton.addEventListener("click", () => {
      historyButton.disabled = true
      historyButton.textContent = 'Wait...'
      historyButton.style.cursor = 'not-allowed'
      let detail = { kind: 'make', callback: this.#onHistory }
      process.presenter.dispatchEvent(new CustomEvent('history', { detail }))
    })
  }

  #inviteOrSK () { // {{{2
    this.pan2currentPosition()
    showModal('inviteOrSK', () => location.reload())
  }

  async #onHistory (history) { // desc {{{2
    let p = null, index = 0, infoWindow = new google.maps.InfoWindow({maxWidth:300}), self = this
    this.history = history
    for (let make of history) {
      if (make.maker != p) {
        p = make.maker
        index++
        let position = {lat:+make.makerCached.lat[0], lng:+make.makerCached.lng[0]}
        let makes = history.filter(m => m.maker == p), content = ''
        for (let m of makes) {
          content += `<p class='${classP(m)}' onclick='process.view.onMakeSelected(${history.indexOf(m)})'>` + m.description + '</p>'
        }
        let marker = new google.maps.Marker({map:myMap, position, label:`${index}`,
          title: make.makerCached.greeting,
        })
        marker.addListener("click", () => {
          infoWindow.close()
          infoWindow.setContent(content)
          infoWindow.open(marker.getMap(), marker)
          self.historyButton.textContent = `Select ${marker.getTitle()}'s Make`
        })
      }
    }
    this.historyButton.textContent = 'Select Maker'
  }

  #showHistoryOfMakes (localSessionInfo) { // {{{2
    console.log(localSessionInfo)
  }

  constructor (presenter) { // {{{2
    super()
  }

  onJoin (txResultBody) { // {{{2
    let cogs = document.getElementById('inviteOrSK_goCogs')
    cogs.style.display = 'none'
    let congrats = document.getElementById('onJoin')
    let textContent = congrats.firstChild.textContent.replace(
      'XXX', process.presenter.userInfo.greeting
    )
    textContent = textContent.replace(
      'XXX', process.env.STELLAR_NETWORK
    )
    if (process.presenter.userInfo.fundsRequested) {
      textContent = textContent.replace(
        'XXX', 
        `We funded you with HEXA ${process.presenter.userInfo.fundsRequested}.`
      )
    }
    congrats.firstChild.textContent = textContent
    congrats.style.display = 'block'
  }

  onMakeSelected (i) { // {{{2
    this.historyButton.textContent = 'Reload current page'
    let label = "ABCDEF...", j = 0

    for (let take of this.history[i].takesCached) {
      console.log(take)
      let position = {lat:+take.takerCached.lat[0], lng:+take.takerCached.lng[0]}
      let marker = new google.maps.Marker({map:myMap, position, label:label[j++],
        title: take.takerCached.greeting,
      })
      let content = `<p class='${classP(take)}'>` + (take.description.length > 0 ? take.description : 'AS IS') + '</p>'
      take.infoWindow = new google.maps.InfoWindow({maxWidth:300})
      take.infoWindow.setContent(content)
      take.infoWindow.open(marker.getMap(), marker)
    }
  }

  show (userInfo, localSessionInfo) { // {{{2
    userInfo ? console.log('TODO:', userInfo)
      : !localSessionInfo ? this.#addUI()
      : localSessionInfo.mode == 'showHistoryOfMakes' ? this.#showHistoryOfMakes(localSessionInfo)
      : this.#inviteOrSK()
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) { // {{{1
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(myMap);
}


// }}}1
export { OnLoadView, }
