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
var storage = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"FrontImage");
var storage1 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"BackImage");
var storage2 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"ShopImage");
var storage3 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"OwnerImage");
var metadata = {
  contentType: 'image/jpeg',
};

var uploadTask = storage.put(FrontImg);
var uploadTask1 = storage1.put(BackImg);
var uploadTask2 = storage2.put(ShopImg);
var uploadTask3 = storage3.put(OwnerImg);
uploadTask.on('state_changed', function(snap){

},function(error){

},function complete(){
  uploadTask.then(snapshot => {
    var image = snapshot.downloadURL;
        console.log(image);
    });
  
});
uploadTask1.on('state_changed', function(snap){

},function(error){

},function complete(){
  uploadTask.then(snapshot => {
    let image = snapshot.metadata.downloadURL;
        console.log(image);
    });
  
});
uploadTask2.on('state_changed', function(snap){

},function(error){

},function complete(){
  uploadTask.then(snapshot => {
    let image = snapshot.metadata.downloadURL;
        console.log(image);
    });
  
});
uploadTask3.on('state_changed', function(snap){

},function(error){

},function complete(){
  uploadTask.then(snapshot => {
    let image = snapshot.metadata.downloadURL;
        console.log(image);
    });
  
});
});
}



console.log(FrontImg.name);
root.set({
    Year:sel2.options[sel2.selectedIndex].text,
    Semester:sel3.options[sel3.selectedIndex].text,
    Course:sel4.options[sel4.selectedIndex].text,
    FileName: selectedFile.name
})
});