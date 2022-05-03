import { showModal, } from '../utils.mjs'

let debug = true // {{{1

class OnLoadView { // {{{1
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

class OnLoadViewInit extends OnLoadView { // {{{1
  #inviteOrSK () { // {{{2
    showModal('inviteOrSK', () => location.reload())
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

  show (userInfo) { // {{{2
    this.pan2currentPosition()
    userInfo ? console.log('TODO:', userInfo)
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
export { OnLoadViewInit, }
