
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
                    var date = snap2.child("Date").val();
                    var Name = snap2.child("Name").val();
                    var Itms = snap2.child("Items").val();
                    var button = document.createElement('input');

                    // button.onclick=GetTableValues(childKey)
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Send to customer');
                  button.setAttribute('onclick', 'GetTableValues(\''+childKey+'\')');
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
                    var res;
                   
                    cel1.innerHTML=1
                    cel2.innerHTML=Name;
                    cel4.innerHTML=date;
                    cel5.innerHTML = "<input type=\"checkbox\" name=\"Done\" /> Done";
                    cel6.innerHTML=Itms;
                    cel7.appendChild(button);
                  })
              console.log(childSnapshot1.key);
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

  