var lat,long,north,south,east,west;
var earth = 6378;
var pi = Math.PI;
var finLat,finLong;
(function(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           lat=position.coords.latitude;
           long= position.coords.longitude;
          north = lat+(2/earth)*(180/pi);
          south = lat-(2/earth)*(180/pi);
          east = long+(2/earth)*(180/pi)/Math.cos(lat*pi/180);
          west = long-(2/earth)*(180/pi)/Math.cos(lat*pi/180);
          console.log(north);
          console.log(south);
          console.log(east);
          console.log(west);
          console.log(lat);
          console.log(long);
          

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
                console.log(lat1>=south && lat1<=north );
                
                
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
          root.ref(childKey).child("Shop Details").child("ShopImg").once("value").then(function(snap){
            var shop = snap.child("URL").val();
          //console.log(name);
          //console.log(address);
          //console.log(shopName);
          //console.log(PhoneNum);
          var button = document.createElement('input');
          button.setAttribute('type','button');
          button.setAttribute('value','Order');
          button.setAttribute('onclick','GetTableValues(\''+childKey+'\')');
          var count=1;
          var table  = document.getElementsByTagName("table")[0];
          var newrow = table.insertRow(1);
          var cel1 = newrow.insertCell(0);
          var res;
          if(count<=10 && count >=1){
           button.setAttribute('class','btn btn__active');
          }
          else{
            button.setAttribute('class','btn btn__pledged');
          }
          cel1.innerHTML="<div class=\"container-fluid\" id=\"shop_details_container\"><div class=\"row\" id=\"shop_details_less\"><div class=\"col-4 my-auto\" id=\"shop_img\"> <img id=\"s_img\" class=\"rounded img-fluid\" alt=\"Placeholder image\" src=\""+shop+"\"> </div>            <div class=\"col-8 my-auto\" id=\"shop_details\">              <div class=\"card col-8\">                <div class=\"card-body\">                  <h5 class=\"card-title\" id=\"Sname\">Chinmay Shop</h5>                  <h6 class=\"card-subtitle mb-2 text-muted\" id=\"s_cat\">Kirana and General</h6>                  <p class=\"card-text\" id=\"s_addr\">8-46/2,JP Colony, Patancheru, Hyderabad , Telangana, India, 502319</p>                </div>              </div>              <button class=\"btn btn-primary\" id=\"order_now\" onclick=\"GetTableValues(\""+childKey+'\')" data-toggle=\"modal\" data-target=\"#item_form\">Order Now</button>            </div>         </div><div class=\"col-8\" id=\"map\"></div>  </div>";
          document.getElementById("Sname").innerHTML=shopName;
          document.getElementById("s_addr").innerHTML=address;

        })
        
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