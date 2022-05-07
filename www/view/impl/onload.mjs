import { showModal, } from '../utils.mjs'

let debug = true // {{{1

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

  #onHistory (history) { // asc {{{2
    let p = null, index = 0, infoWindow = new google.maps.InfoWindow(), self = this
    this.history = history
    for (let make of history) {
      if (make.user.pk != p) {
        p = make.user.pk
        index++
        let position = { lat: +make.user.lat[0], lng: +make.user.lng[0] }
        let makes = history.filter(m => m.user.pk == p), content = ''
        for (let m of makes) {
          let color = m.memo.value == 'Offer' ? 'green' : 'red' 
          content += `<p style='color: ${color}' onclick='process.view.onMakeSelected(${history.indexOf(m)})'>` + m.description + '</p>'
        }
        let marker = new google.maps.Marker({ map: myMap, position,
          label: `${index}`,
          title: make.user.greeting,
        })
        marker.addListener("click", () => {
          infoWindow.close()
          infoWindow.setContent(content)
          infoWindow.open(marker.getMap(), marker)
          self.historyButton.textContent = `Select ${marker.getTitle()}'s Make`
        })
      }
    }
    console.log(history)
    this.historyButton.textContent = 'Select Maker'
    //this.historyButton.disabled = false
    //this.historyButton.style.cursor = 'pointer'
  }

  #onTakes (takes) { // asc {{{2
    console.log(takes)
    this.historyButton.textContent = 'Select Taker'
  }

  constructor (presenter) { // {{{2
    super()
  }

  onJoin (txResultBody) { // {{{2
    debug && console.log(txResultBody)
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
    this.historyButton.textContent = 'Wait...'
    let detail = { kind: 'take', callback: this.#onTakes, self: this.history[i] }
    process.presenter.dispatchEvent(new CustomEvent('history', { detail }))
  }

  show (userInfo) { // {{{2
    let localSessionInfo = null // TODO get it from Presenter along with userInfo
    userInfo ? console.log('TODO:', userInfo)
      : !localSessionInfo ? this.#addUI()
      : this.#inviteOrSK()
  }
  // }}}2
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
