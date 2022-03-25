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
  #acceptInviteOrPK () { // {{{2
    showModal('acceptInviteOrPK')
  }

  constructor (presenter) { // {{{2
    super()
    this.presenter = presenter
  }

  show (userInfo) { // {{{2
    this.pan2currentPosition()
    userInfo ?
      console.log('TODO:', userInfo)
    : this.#acceptInviteOrPK()
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

function showModal (contentId, close) { // {{{1
  // Show the modal
  let modal = document.getElementById("commonParentModal");
  modal.style.display = "block";
  let content = document.getElementById(contentId)
  let text
  switch (contentId) {
    case 'acceptInviteOrPK':
      break
    case 'part2End':
    case 'payingBidder':
      text = content.children[1].textContent
      content.children[1].textContent = process.presenter.userInfo.greeting + text
      break
    default: // req1Intro, confirmBidAccept, makeRequest, testClawbacks
      text = content.children[1].firstElementChild.textContent
      content.children[1].firstElementChild.textContent =
        process.presenter.userInfo.greeting + text
  }
  content.style.display = "block";

  // Get the <span> element that closes the modal
  let span = document.getElementById(`${contentId}X`)

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    content.style.display = "none";
    !!close && close()
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      content.style.display = "none";
      !!close && close()
    }
  }
}

// }}}1
export { OnLoadViewInit, }
