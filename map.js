var x = document.getElementById("map");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function store(){
  firebase.auth().onAuthStateChanged(user => {
  var name = document.getElementById("name").value;
  var shpname = document.getElementById("shpname").value;
  var address = document.getElementById("address").value;
  var mobnum = document.getElementById("mobnum").value;
  var shoplicense = document.getElementById("shoplicense").value;
  var frontlicense = document.getElementById("frontlicense").value;
  var backlicense = document.getElementById("backlicense").value;
  var shoppic = document.getElementById("shoppic").value;
  var shopowner = document.getElementById("shopowner").value;
  var mail = user.email;
  firebase.database().ref(user.uid).child("Shop Details").set({
  Name: name,
  ShopName:shpname,
  Address: address,
  MobileNumber: mobnum,
  ShopLiscense:shoplicense
});
});
}