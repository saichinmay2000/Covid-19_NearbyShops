var lat,long,north,south,east,west;
var earth = 6378;
var pi = Math.PI;
var finLat,finLong;
(function(){
    
    firebase.auth().onAuthStateChanged(user => {
        var root =  firebase.database();
        var root1 =  firebase.database().ref("Approval");
        root1.child(user.uid).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              
        root1.child(user.uid).child(childKey).once("value").then(function(snap){
          var Name = snap.child("Name").val();
          var Req = snap.child("Request").val();
          console.log(Name);
          
          
                if(Req=="Not Accepted"){
                //console.log(finLat);
                //console.log(finLong);
                alert("You Have A Notification");
              
          
         root.ref(childKey).child("Shop Details").once("value").then(function(snap){
          var name = snap.child("Name").val();
          var address = snap.child("Address").val();
          var shopName = snap.child("ShopName").val();
          var PhoneNum = snap.child("MobileNumber").val();
          root.ref(childKey).child("Shop Details").child("ShopImg").once("value").then(function(snap){
            var imglink = snap.child("URL").val();

          //console.log(name);
          //console.log(address);
          //console.log(shopName);
          //console.log(PhoneNum);
          var count=1;
          var button = document.createElement('input');

           // button.onclick=GetTableValues(childKey)
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Check');
        button.setAttribute('onclick', 'GetTableValues(\''+childKey+'\')');
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
          
        button.setAttribute("class", "btn btn__active");
          }
          else if(count>10){
        button.setAttribute("class", "btn btn__pledged");
          }
          cel1.innerHTML="<img src=\""+ imglink+"\" alt=\"\" style=\"width: 100px;\">"
          cel2.innerHTML=shopName;
          cel3.innerHTML=PhoneNum;
          cel4.innerHTML=Req;
          cel5.appendChild(button);
        })
        })
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