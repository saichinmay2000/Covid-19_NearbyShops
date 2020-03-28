var lat,long,north,south,east,west;
var earth = 6378;
var pi = Math.PI;
var finLat,finLong;
(function(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           lat=position.coords.latitude;
           long= position.coords.longitude;
          north = lat+(1/earth)*(180/pi);
          south = lat-(1/earth)*(180/pi);
          east = long+(1/earth)*(180/pi)/Math.cos(lat*pi/180);
          west = long-(1/earth)*(180/pi)/Math.cos(lat*pi/180);
          
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("phone").innerHTML=user.phoneNumber;
        var root =  firebase.database();
        var root1 =  firebase.database().ref("Locations");
        root1.once("value").then(function(snap){
            snap.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              root1.child(childKey).once("value").then(function(snap1){
                var lat1 = snap1.child("Latitude").val();
                var long1 = snap1.child("Longitude").val();
                if(lat1>=south && lat1<=north ){
                  if(long1<=east && long1>=west){
                    finLat=lat1;
                    finLong=long1;
                //console.log(finLat);
                //console.log(finLong);
              
          
          root.ref(childKey).child("Shop Details").once("value").then(function(snap){
          var name = snap.child("Name").val();
          var address = snap.child("Address").val();
          var shopName = snap.child("ShopName").val();
          var PhoneNum = snap.child("MobileNumber").val();


          //console.log(name);
          //console.log(address);
          //console.log(shopName);
          //console.log(PhoneNum);
          var count=1;
          var table  = document.getElementsByTagName("table")[0];
          var newrow = table.insertRow(1);
          var cel1 = newrow.insertCell(0);
          var cel2 = newrow.insertCell(1);
          var cel3 = newrow.insertCell(2);
          var cel4 = newrow.insertCell(3);
          var cel5 = newrow.insertCell(4);
          var cel6 = newrow.insertCell(5);
          var res;
          if(count<=10 && count >=1){
           res = "<button onclick = \"deleterow(id)\"  class=\"btn btn__active\">Order</button>";}
          else{
            res = "<button onclick = \"deleterow(id)\"  class=\"btn btn__pledged\">Order</button>";
          }
          cel2.innerHTML=name;
          cel3.innerHTML=shopName;
          cel4.innerHTML=PhoneNum;
          cel5.innerHTML=address;
          cel6.innerHTML =  res;
          
        })
        }
      }
        })
      })
    })




      });


})()
function Logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.replace("index.html")
  }).catch(function(error) {
  // An error happened.
  });
  }

  