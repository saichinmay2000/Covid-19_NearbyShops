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
var FrontImg,BackImg,ShopImg,OwnerImg;
function Front(){
  FrontImg = event.target.files[0];
  console.log(FrontImg.name);
}
function Back(){
  BackImg = event.target.files[0];
  console.log(BackImg.name);
}
function Shop(){
  ShopImg = event.target.files[0];
  console.log(ShopImg.name);
}
function Owner(){
  OwnerImg = event.target.files[0];
  console.log(OwnerImg.name);
}

function store(){
 

  firebase.auth().onAuthStateChanged(user => {
var name = document.getElementById("name").value;
var shpname = document.getElementById("shpname").value;
var address = document.getElementById("address").value;
var mobnum = document.getElementById("mobnum").value;
var shoplicense = document.getElementById("shoplicense").value;
var frontlicense = document.getElementById("frontlicense");
var backlicense = document.getElementById("backlicense");
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
var storage = firebase.storage().ref('Images');
var metadata = {
  contentType: 'image/jpeg',
};

var uploadTask = storage.put(FrontImg,metadata);
var uploadTask1 = storage.put(BackImg,metadata);
var uploadTask2 = storage.put(ShopImg,metadata);
var uploadTask3 = storage.put(OwnerImg,metadata);
uploadTask.on('state_changed', function(snap){

},function(error){

},function(){
  var downloadurl = uploadTask.snap.downloadURL;
  console.log(downloadurl);
  
});
uploadTask1.on('state_changed', function(snap){

},function(error){

},function(){
  var downloadurl = uploadTask.snap.downloadURL;
  console.log(downloadurl);
  
});
uploadTask2.on('state_changed', function(snap){

},function(error){

},function(){
  var downloadurl = uploadTask.snap.downloadURL;
  console.log(downloadurl);
  
});
uploadTask3.on('state_changed', function(snap){

},function(error){

},function(){
  var downloadurl = uploadTask.snap.downloadURL;
  console.log(downloadurl);
  
});

  
});
}