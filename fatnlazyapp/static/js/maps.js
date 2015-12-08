function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(44.5403, -78.5463),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var resultsMap = new google.maps.Map(mapCanvas, mapOptions);
        
        var geocoder = new google.maps.Geocoder();
       
        var parameters = location.search.substring(1);
        var temp = parameters.split("=");
        
        var address = temp[1];
       geocoder.geocode({'address': address}, function(results, status) 
       {
            
           if (status === google.maps.GeocoderStatus.OK) 
           {
              resultsMap.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                               map: resultsMap,
                              position: results[0].geometry.location
                             });
            } 
            else 
            {
              alert('Geocode was not successful for the following reason: ' + status);
            }
        });

        }
      
google.maps.event.addDomListener(window, 'load', initialize);