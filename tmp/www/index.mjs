import { getLocations } from './model/users.mjs'

let map, infoWindow; // {{{1

console.log(getLocations())

function initMap() { // {{{1
/*
  map = new google.maps.Map(document.getElementById("map"), { // {{{2
    center: { lat: 25.974, lng: -80.130 },
    zoom: 11,
  });
  infoWindow = new google.maps.InfoWindow();

  let marker = new google.maps.Marker({ // {{{2
    position: { lat: 26.0, lng: -80.3 },
    map: map,
  });
  marker.setIcon('gratz.png')
*/
  let locations = getLocations()
/*
  const infowindow2 = new google.maps.InfoWindow({ // {{{2
    content: "<p>Marker Location:" + marker.getPosition() + "</p>",
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow2.open(map, marker);
  });


  let locationButton = document.createElement("button"); // {{{2

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationButton.hidden = true
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent(`Location found: lat ${pos.lat}, lng ${pos.lng}`);
          infoWindow.open(map);
          map.setCenter(pos);
        },
        (error) => {
          alert(error.message)
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  // }}}2
*/
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) { // {{{1
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
