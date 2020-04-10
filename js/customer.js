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
          button.setAttribute("data-toggle","modal");
          button.setAttribute("data-target","#item_form");
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
          cel1.innerHTML="<div class=\"container-fluid\" id=\"shop_details_container\"><div class=\"row\" id=\"shop_details_less\"><div class=\"col-4 my-auto\" id=\"shop_img\"> <img id=\"s_img\" class=\"rounded img-fluid\" alt=\"Placeholder image\" src=\""+shop+"\"> </div>            <div class=\"col-8 my-auto\" id=\"shop_details\">              <div class=\"card col-8\">                <div class=\"card-body\">                  <h5 class=\"card-title\" id=\"Sname\">Chinmay Shop</h5>                  <h6 class=\"card-subtitle mb-2 text-muted\" id=\"s_cat\">Kirana and General</h6>                  <p class=\"card-text\" id=\"s_addr\">8-46/2,JP Colony, Patancheru, Hyderabad , Telangana, India, 502319</p>                </div>              </div>              <div id=\"button\"></div>            </div>         </div>  </div>";
          document.getElementById("Sname").innerHTML=shopName;
          document.getElementById("s_addr").innerHTML=address;
          document.getElementById("button").appendChild(button);
          document.getElementById("shopName").innerHTML = name;

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
      document.getElementById("ShopName").innerHTML=shop;
      document.getElementById("ownerName").innerHTML=name;
      submit(name,shop);
    })
  
  }
  function submit(a,b){

    var Ione = document.getElementById("item_name_1").value;
    var Itwo = document.getElementById("item_name_2").value;
    var Ithree = document.getElementById("item_name_3").value;
    var Ifour = document.getElementById("item_name_4").value;
    var Ifive = document.getElementById("item_name_5").value;
    var Isix = document.getElementById("item_name_6").value;
    var Iseven = document.getElementById("item_name_7").value;
    var Ieight = document.getElementById("item_name_8").value;
    var Inine = document.getElementById("item_name_9").value;
    var Iten = document.getElementById("item_name_10").value;
    var Qone = document.getElementById("item_quantity_1").value;
    var Qtwo = document.getElementById("item_quantity_2").value;
    var Qthree = document.getElementById("item_quantity_3").value;
    var Qfour = document.getElementById("item_quantity_4").value;
    var Qfive = document.getElementById("item_quantity_5").value;
    var Qsix = document.getElementById("item_quantity_6").value;
    var Qseven = document.getElementById("item_quantity_7").value;
    var Qeight = document.getElementById("item_quantity_8").value;
    var Qnine = document.getElementById("item_quantity_9").value;
    var Qten = document.getElementById("item_quantity_10").value;
    var Uone1 = document.getElementById("item_unit_1").selectedIndex;
    var Utwo2 = document.getElementById("item_unit_2").selectedIndex;
    var Uthree3 = document.getElementById("item_unit_3").selectedIndex;
    var Ufour4 = document.getElementById("item_unit_4").selectedIndex;
    var Ufive5 = document.getElementById("item_unit_5").selectedIndex;
    var Usix6 = document.getElementById("item_unit_6").selectedIndex;
    var Useven7 = document.getElementById("item_unit_7").selectedIndex;
    var Ueight8 = document.getElementById("item_unit_8").selectedIndex;
    var Unine9 = document.getElementById("item_unit_9").selectedIndex;
    var Uten10 = document.getElementById("item_unit_10").selectedIndex;
    var Uone = document.getElementsByTagName("option")[Uone1].value;
    var Utwo =document.getElementsByTagName("option")[Utwo2].value;
    var Uthree = document.getElementsByTagName("option")[Uthree3].value;
    var Ufour = document.getElementsByTagName("option")[Ufour4].value;
    var Ufive = document.getElementsByTagName("option")[Ufive5].value;
    var Usix = document.getElementsByTagName("option")[Usix6].value;
    var Useven = document.getElementsByTagName("option")[Useven7].value;
    var Ueight = document.getElementsByTagName("option")[Ueight8].value;
    var Unine = document.getElementsByTagName("option")[Unine9].value;
    var Uten = document.getElementsByTagName("option")[Uten10].value;
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
                item1:Ione,
                Quan1:Qone,
                U1:Uone,
                item2:Itwo,
                Quan2:Qtwo,
                U2:Utwo,
                item3:Ithree,
                Quan3:Qthree,
                U3:Uthree,
                item4:Ifour,
                Quan4:Qfour,
                U4:Ufour,
                item5:Ifive,
                Quan5:Qfive,
                U5:Ufive,
                item6:Isix,
                Quan6:Qsix,
                U6:Usix,
                item7:Iseven,
                Quan7:Qseven,
                U7:Useven,
                item8:Ieight,
                Quan8:Qeight,
                U8:Ueight,
                item9:Inine,
                Quan9:Qnine,
                U9:Unine,
                item10:Iten,
                Quan10:Qten,
                U10:Uten,
                URL:childKey
              })
              
            }
            
          })
        })
    })

  })
}