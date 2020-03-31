
(function(){
  
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("email").innerHTML=user.email;
        
        
        var root12 =  firebase.database().ref(user.uid).child("Shop Details");
        root12.once("value").then(function(snap){
        //  snap.forEach(function(childSnapshot) {
          //  var childKey = childSnapshot.key;
          //console.log(childKey);
          
          var veri = snap.child("verify").val();
          var deco = document.getElementById("veri");
          if(veri==="Verified"){
          deco.innerHTML=veri;
          deco.style.color='white';
          deco.style.fontStyle='bold';
          deco.style.backgroundColor = "LimeGreen";
          deco.style.borderRadius = "10px";
          deco.style.width="70px";
          console.log(childSnapshot.val());
        }
        else{
          deco.innerHTML=veri;
          deco.style.color='white';
          deco.style.fontStyle='bold';
          deco.style.backgroundColor = "red";
          deco.style.borderRadius = "10px";
          deco.style.width="100px";
        }
        //})
      })

      var root =  firebase.database();
      var root1 =  firebase.database().ref("Orders");
      root1.once("value").then(function(snap){
          snap.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            
            root1.child(childKey).once("value").then(function(snap1){
              snap1.forEach(function(childSnapshot1) {
                if(user.uid==childSnapshot1.key){
                  root1.child(childKey).child(childSnapshot1.key).once("value").then(function(snap2){
                    console.log(snap2.val());
                    console.log(childSnapshot1.key);
                    root.ref("Notifications").child(user.uid).child(childKey).once("value").then(function(snap){
                      var order = snap.child("Order").val();
                      var pick = snap.child("PickUp").val();
                    
                    var date = snap2.child("Date").val();
                    var Name = snap2.child("Name").val();
                    var Itms = snap2.child("Items").val();
                    var button = document.createElement('input');
                   root.ref("Customers").child(childKey).once("value").then(function(snap){
                      var Address = snap.child("Address").val();
                      
                    // button.onclick=GetTableValues(childKey)
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Send to customer');
                  button.setAttribute('onclick', 'Send(\''+childKey+'\')');
                  button.setAttribute("class", "btn btn-info btn-xs");
                    var table  = document.getElementsByTagName("table")[0];
                    var newrow = table.insertRow(1);
                    var cel1 = newrow.insertCell(0);
                    var cel2 = newrow.insertCell(1);
                    var cel3 = newrow.insertCell(2);
                    var cel4 = newrow.insertCell(3);
                    var cel5 = newrow.insertCell(4);
                    var cel6 = newrow.insertCell(5);
                    var cel7 = newrow.insertCell(6);
                    var cel8 = newrow.insertCell(7);
                    var res,res1;
                    if(order==="Done"){
                      res = "Delivered Order";
                    }
                    else{
                     res = "<input type=\"checkbox\" name=\"Done\" id=\"done\" /> Done";
                    }

                    if(pick==="Picked"){
                      res1 = "Picked Up";
                    }
                    else{
                      res1 = "<input type=\"checkbox\" name=\"Done\" id=\"pick\" /> Picked";
                    }
                    cel1.innerHTML=1
                    cel2.innerHTML=Name;
                    cel3.innerHTML=Address;
                    cel4.innerHTML=date;
                    cel5.innerHTML = res;
                    cel6.innerHTML = res1;
                    cel7.innerHTML=Itms;
                    cel8.appendChild(button);
                  })
               })
              })
                }
              })
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


  function Send(a){
    
    firebase.auth().onAuthStateChanged(user => {
    var done=document.getElementById("done").checked;
    var pick=document.getElementById("pick").checked;
    firebase.database().ref("Notifications").child(user.uid).child(a).once("value").then(function(snap){
      var order = snap.child("Order").val();
      var pick = snap.child("PickUp").val();
      if(order === "Done" && pick==="Picked"){
        alert("Order is Delivered Already")
      }
    else if(done===true){
    var root =  firebase.database();
    var root1 =  firebase.database().ref("Orders");
    root1.once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          root1.child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              if(user.uid==childSnapshot1.key){
                root1.child(childKey).child(childSnapshot1.key).once("value").then(function(snap2){
                  console.log(snap2.val());
                  console.log(childSnapshot1.key);
                  var Name = snap2.child("Name").val();
                  root.ref("Notifications").child(user.uid).child(childKey).set({
                    Name:Name,
                    Order:"Done"
                  })
                })
              }
            })
          })
        })
      })
  }
  else if(pick===true && done==="Done"){
    var root =  firebase.database();
    var root1 =  firebase.database().ref("Orders");
    root1.once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          root1.child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              if(user.uid==childSnapshot1.key){
                root1.child(childKey).child(childSnapshot1.key).once("value").then(function(snap2){
                  console.log(snap2.val());
                  console.log(childSnapshot1.key);
                  var Name = snap2.child("Name").val();
                  root.ref("Notifications").child(user.uid).child(childKey).set({
                    Name:Name,
                    Order:"Done",
                    PickUp:"Picked"
                  })
                })
              }
            })
          })
        })
      })
  }
  else{
    alert("if done Check/Click the check box");
    
  }
})
})
  }
  