
(function(){
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("phone").innerHTML=user.phoneNumber;
        var root =  firebase.database().ref("NdECIUPzYKaq0ZzLXwDFA63uQJa2").child("Shop Details");
        root.once("value").then(function(snap){
          var name = snap.child("Name").val();
          var address = snap.child("Address").val();
          var shopName = snap.child("ShopName").val();
          var PhoneNum = snap.child("MobileNumber").val();
          console.log(name);
          console.log(address);
          console.log(shopName);
          console.log(PhoneNum);
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

  