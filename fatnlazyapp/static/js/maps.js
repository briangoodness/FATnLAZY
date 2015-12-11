var resultsMap;
var currentLat;
var currentLong;
var homeMarker;
var searchResults = [];
var infoWindows = [];
var yelp_results;
var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
var directionsService = new google.maps.DirectionsService();

function initialize() {

  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(37.8717, -122.2728),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  resultsMap = new google.maps.Map(mapCanvas, mapOptions);

  if (navigator.geolocation) {
    var startPos;
    var geoOptions = {
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000
    }

    var geoSuccess = function(position) {
      startPos = position;
      lat = startPos.coords.latitude;
      lng = startPos.coords.longitude;
      currentLong = lng;
      currentLat = lat;
      var point = new google.maps.LatLng(lat, lng);
      resultsMap.setCenter(point);
      // var markerImage = 'http://www.mapsmarker.com/wp-content/uploads/leaflet-maps-marker-icons/bar_coktail.png';
      homeMarker = new google.maps.Marker({
        map: resultsMap,
        position: point,
        // icon: markerImage
      });
      var contentString = '<p class="text-info">Current Location!!!<p>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      google.maps.event.addListener(homeMarker, 'click', function() {
        infowindow.open(resultsMap, homeMarker);
      });
    };


    var geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  } else {
    alert('Geolocation is not supported for this Browser/OS version yet.');
  }



  document.getElementById("searchFood").onclick = searchFood;

  var input = (document.getElementById('newLocation'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', resultsMap);

  document.getElementById("changeLocation").onclick = searchPlace;

  if(directionsDisplay != null) {
    directionsDisplay.setMap(null);
    directionsDisplay = null;
  }
}

function searchPlace() {

  var geocoder = new google.maps.Geocoder();
  var addressBar = (document.getElementById('newLocation'));
  var address = addressBar.value;


  geocoder.geocode({
    'address': address
  }, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {

      newLocation = results[0].geometry.location;
      currentLat = newLocation.lat();
      currentLong = newLocation.lng();

      if (homeMarker != null) {
        homeMarker.setMap(null);
      }
      homeMarker = new google.maps.Marker({
        position: newLocation,
        // map: resultsMap,
        // icon: markerImage
      });

      homeMarker.setMap(resultsMap);

      var contentString = '<p class="text-info">Current Location!!!<p>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      google.maps.event.addListener(homeMarker, 'click', function() {
        infowindow.open(resultsMap, homeMarker);
      });

      // if ((!resultsMap.getBounds().contains(homeMarker.getPosition()))) {
        resultsMap.setCenter(homeMarker.getPosition());
      // }

      if (searchResults.length > 0) {
        for (index = 0; index < searchResults.length; index++) {
          var tempMarker = searchResults[index];
          if (tempMarker != null) {
            tempMarker.setMap(null);
          }
        }
        searchResults = [];
        infoWindows = [];
        if(directionsDisplay != null) {
            directionsDisplay.setMap(null);
            directionsDisplay = null;
        }
      }

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}

function searchFood() {

  var cuisine = (document.getElementById('cuisine').value);

  $.ajax({
    type: "POST",
    url: "/get_results",
    data: {
      lat: currentLat,
      lng: currentLong,
      num_results: 10,
      keyword: cuisine
    }
  }).done(function(param) {
    // do something
    //  alert(param)

    if (searchResults.length > 0) {
      for (index = 0; index < searchResults.length; index++) {
        var tempMarker = searchResults[index];
        if (tempMarker != null) {
          tempMarker.setMap(null);
        }
      }
      searchResults = [];
      infoWindows = [];

      if(directionsDisplay != null) {
          directionsDisplay.setMap(null);
          directionsDisplay = null;
      }
    }

    yelp_results = param['response']
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    var len = yelp_results.length;
    var markerImage = 'http://www.mapsmarker.com/wp-content/uploads/leaflet-maps-marker-icons/bar_coktail.png';

    for (i = 0; i < len; i++) {
      item = yelp_results[i];
      bus_lat = item['business_lat'];
      bus_long = item['business_long'];
      var point = new google.maps.LatLng(bus_lat, bus_long);

      var marker = new google.maps.Marker({
        position: point,
        title: item['name'],
        icon: markerImage,
        infoWindowIndex: i
      });
      var contentString = item['name'];
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var tempUrl = "http://find-and-ride.herokuapp.com/" + yelp_results[i]['short_url'];

          infowindow.setContent('<p class="text-info">' +'<b>' + yelp_results[i]['name']+ '</b>' +': An Uber is available at '+'<b>'+ yelp_results[i]['uber_estimate']+'</b>' +' to take you here.<b><br>Rating</b>: '+yelp_results[i]['rating']+'/5 <b><br>Distance</b>: '+String((parseFloat(yelp_results[i]['distance'])/1000).toFixed(3))+' km<br><b>Phone #</b>: '+yelp_results[i]['phone']+' <br>To know more about this place, please visit its yelp page: ' + '<a href="'+ tempUrl +'" target="_blank"><b>'+ yelp_results[i]['short_url']+'</b></a>'+'</p>');
          infowindow.open(resultsMap, marker);


            directionsDisplay.setMap(resultsMap);

            var start = homeMarker.getPosition();
            var end = marker.getPosition();
            var request = {
                origin:start,
                destination:end,
                travelMode: google.maps.TravelMode.DRIVING
              };
              directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setOptions({ preserveViewport: true });
                  directionsDisplay.setDirections(result);
                }
            });
        }
      })(marker, i));



      marker.setMap(resultsMap);

      infoWindows.push(infowindow);
      searchResults.push(marker)

    }
    autoCenter();
  });


}

function autoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      for (var i = 0; i < searchResults.length; i++) {
				bounds.extend(searchResults[i].getPosition());
      }
      //  Fit these bounds to the map
      //resultsMap.setCenter(bounds.getCenter());
       resultsMap.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);
