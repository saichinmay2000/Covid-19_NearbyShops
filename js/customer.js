var lat,long,north,south,east,west;
var earth = 6378;
var pi = Math.PI;
var finLat,finLong;
(function(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           lat=position.coords.latitude;
           long= position.coords.longitude;
           long=long-0.08;
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

  var ProfileImg;
  function profile1(){
      ProfileImg = event.target.files[0];
      console.log(ProfileImg.name);
    }
    var link;
    function update1(){
      firebase.auth().onAuthStateChanged(user => {
    document.getElementById("progre").style.display="block";
    var storage = firebase.storage().ref("/Profile/"+"/"+user.uid+"/"+"Profile");
        var uploadTask = storage.put(ProfileImg);
        var progress1;
        uploadTask.on('state_changed', function(snapshot){
           progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("myProgress1").style.width = progress1+"%";
          document.getElementById("myProgress1").innerHTML = progress1+"%";
        
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'  
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
          }, function(error) {
          }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL1) {
            firebase.database().ref("Customers").child(user.uid).child("Profile").set({
              URL:downloadURL1,
              progress:progress1
            });
            link=downloadURL1;  
          });
          });
      });
    document.getElementById("upload").style.display="none";
  }
  function SaveChange(){
    firebase.auth().onAuthStateChanged(user => {
      var name = document.getElementById("newname").value;
      var email = document.getElementById("newemail").value;
      var address = document.getElementById("newaddress").value;
      firebase.database().ref("Customers").child(user.uid).set({
        Name:name,
        Email:email,
        Address:address,
        URL:link
      })
    })
    
  }
  function GetTableValues(vale){

    var ro = firebase.database();
    ro.ref(vale).child("Shop Details").once("value").then(function(snap){
      var name = snap.child("Name").val();
      var shop = snap.child("ShopName").val();
      document.getElementById("shopName").innerHTML=shop;
      document.getElementById("ownerName").innerHTML=name;
      
    submit(name,shop);
    document.getElementById("upload").style.display="block";
    document.getElementById("app").style.display="none";
    })
    document.getElementById("upload").style.display="block";
    document.getElementById("app").style.display="none";
  
  }
  function submit(a,b){
    document.getElementById("upload").style.display="none";
    document.getElementById("app").style.display="block";

    var name = document.getElementById("name").value;
    var date =document.getElementById("date").value;
    var itms = document.getElementById("items").value;
    var sname=a;
    var sown = b;
    var num=3;
    firebase.auth().onAuthStateChanged(user1 => {
      var root = firebase.database().ref("Locations");
      var root1 = firebase.database();
      root.once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          root1.ref(childKey).child("Shop Details").once("value").then(function(snap1){
            var ShopName = snap1.child("ShopName").val();
            var OwnName = snap1.child("Name").val();
            console.log(OwnName);
            console.log(sname);
            
            console.log(OwnName==sname);
            console.log(OwnName==sname && ShopName==sown);
            
            if(OwnName==sname && ShopName==sown){
              firebase.database().ref("Orders").child(user1.uid).child(childKey).set({
                Name:name,
                Date:date,
                Items:itms,
                URL:childKey
              })
              
            }
            
          })
        })
    })

  })
}