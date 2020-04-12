(function(){
    firebase.auth().onAuthStateChanged(user => {
        var root =  firebase.database();
        var root1 =  firebase.database().ref("Locations");
        root1.once("value").then(function(snap){
            snap.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              root1.child(childKey).once("value").then(function(snap1){
          root.ref(childKey).child("Shop Details").once("value").then(function(snap){
          var name = snap.child("Name").val();
          var address = snap.child("Address").val();
          var shopName = snap.child("ShopName").val();
          var PhoneNum = snap.child("MobileNumber").val();
          root.ref(childKey).child("Shop Details").child("ShopImg").once("value").then(function(snap){
            var shop = snap.child("URL").val();

            root.ref("Locations").child(childKey).once("value").then(function(snap){
                lat = snap.child("Latitude").val();
                long = snap.child("Longitude").val();
            console.log(name);
          console.log(address);
          console.log(shopName);
          console.log(PhoneNum);
          console.log(lat);
          console.log(long);
          
          
         
            })
        
        })
        
  })
        })
      })
    })
      });

})()