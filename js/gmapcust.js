var map, infoWindow,newress;
function initMap() {
	console.log('qwertyu');
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
        infoWindow.open(map);
        map.setCenter(pos);
        var marker = new google.maps.Marker({position:pos,draggable: false,map: map,title: 'Shop Location'});
        console.log(pos);
        firebase.auth().onAuthStateChanged(user => {
        marker.addListener('position_changed', function(){
           
            newres=marker.getPosition().toString();
                 map.setCenter(marker.getPosition());
                 
        });
        });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
            
        });
        
    } else {
        handleLocationError(false, infoWindow, map.getCenter());}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    
}


