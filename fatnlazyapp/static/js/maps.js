// function initialize() {
//         var mapCanvas = document.getElementById('map');
//         var mapOptions = {
//           center: new google.maps.LatLng(44.5403, -78.5463),
//           zoom: 16,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         var resultsMap = new google.maps.Map(mapCanvas, mapOptions);
        
//         var geocoder = new google.maps.Geocoder();
       
//         var parameters = location.search.substring(1);
//         var temp = parameters.split("=");
        
//         var address = temp[1];
//        geocoder.geocode({'address': address}, function(results, status) 
//        {
            
//            if (status === google.maps.GeocoderStatus.OK) 
//            {
//               resultsMap.setCenter(results[0].geometry.location);
//                var marker = new google.maps.Marker({
//                                map: resultsMap,
//                               position: results[0].geometry.location
//                              });
//             } 
//             else 
//             {
//               alert('Geocode was not successful for the following reason: ' + status);
//             }
//         });

//         }
var resultsMap;

function initialize() {

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(44.5403, -78.5463),
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
              var point = new google.maps.LatLng(lat,lng);
              resultsMap.setCenter(point);
               var marker = new google.maps.Marker({
                               map: resultsMap,
                              position: point,
                              title:"Current Location!!!"
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
        }
        else {
            alert('Geolocation is not supported for this Browser/OS version yet.');
        }

        document.getElementById("searchFood").onclick = searchFood;

        var input = (document.getElementById('newLocation'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', resultsMap);

        document.getElementById("searchPlace").onclick = searchPlace;
}

function searchPlace(){

  var geocoder = new google.maps.Geocoder();

  var addressBar = (document.getElementById('newLocation'));

  var address = addressBar.value;


  geocoder.geocode({'address': address}, function(results, status) 
       {
            
           if (status === google.maps.GeocoderStatus.OK) 
           {
               var marker = new google.maps.Marker({
                              position: results[0].geometry.location,
                              title:"Your Place!"
                             });

               marker.setMap(resultsMap);
               if ((!resultsMap.getBounds().contains(marker.getPosition()))) 
               { 
                  resultsMap.setCenter(marker.getPosition());  
               }
            } 
            else 
            {
              alert('Geocode was not successful for the following reason: ' + status);
            }
        });
}

function searchFood(){

  var geocoder = new google.maps.Geocoder();
  var address = '1828 Walnut St., Berkeley, CA, USA';


  geocoder.geocode({'address': address}, function(results, status) 
       {
            
           if (status === google.maps.GeocoderStatus.OK) 
           {
               var marker = new google.maps.Marker({
                              position: results[0].geometry.location,
                              center: results[0].geometry.location,
                              title:"Home!"
                             });

               marker.setMap(resultsMap);

            } 
            else 
            {
              alert('Geocode was not successful for the following reason: ' + status);
            }
        });
}
      
google.maps.event.addDomListener(window, 'load', initialize);
