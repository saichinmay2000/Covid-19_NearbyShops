var x = document.getElementById("map");
function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        x.innerHTML = "GeoLocation is turned off or Geolocation is not supported.";
    }
}
function showPosition(Position)
{
    x.innerHTML = "Latitude: "+ Position.cord.latitude + "<br> Longitude: "+ Position.cord.longitude;
}
