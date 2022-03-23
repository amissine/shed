class OnLoadView { // {{{1
  constructor () { // {{{2
  }

  pan2currentPosition (userRole = 'user2join') { // {{{2
    let infoWindow = new google.maps.InfoWindow()

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    if (!navigator.geolocation) { // Browser doesn't support Geolocation
      return handleLocationError(false, infoWindow, myMap.getCenter());
    }
    navigator.geolocation.getCurrentPosition(
      position => this.welcome(position, userRole),
      error => handleLocationError(true, infoWindow, myMap.getCenter())
    )
  }

  welcome (position, userRole) { // {{{2
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
  constructor (presenter) { // {{{2
    super()
    this.presenter = presenter
  }
  // }}}2
}
// }}}1
export { OnLoadViewInit, }
