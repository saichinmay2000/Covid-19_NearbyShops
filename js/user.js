
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
                console.log(user.uid===childSnapshot1.key);
                if(user.uid==childSnapshot1.key){
                  
                  root1.child(childKey).child(user.uid).once("value").then(function(snap2){
                    
            console.log(childKey);
                    var date = snap2.child("Date").val();
                    var Name = snap2.child("Name").val();
                    var Itms = snap2.child("Items").val();
                    var button = document.createElement('input');
                      
                    // button.onclick=GetTableValues(childKey)
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Bill It');
                  button.setAttribute('onclick', 'Bill(\''+childKey+'\')');
                  button.setAttribute("class", "btn btn-info btn-xs");
                    var table  = document.getElementsByClassName("table1")[0];
                    var newrow = table.insertRow(1);
                    var cel1 = newrow.insertCell(0);
                    var cel2 = newrow.insertCell(1);
                    var cel3 = newrow.insertCell(2);
                    var res,res1;
                   
                    cel1.innerHTML=Name
                    cel2.innerHTML=Itms;
                    cel3.appendChild(button);
              })
                }
              })
            })
            root.ref("Approval").child(childKey).child(user.uid).once("value").then(function(snap){
              var table  = document.getElementsByClassName("table2")[0];
              var newrow = table.insertRow(1);
              var cel1 = newrow.insertCell(0);
              var cel2 = newrow.insertCell(1);
              var cel3 = newrow.insertCell(2);
             
              cel1.innerHTML=snap.child("Name").val();
              cel2.innerHTML=snap.child("Items").val();
              cel3.innerHTML = snap.child("Price").val();
              
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


  function Bill(a){
    var Name,Itms;
    var root = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
    root.ref("Orders").child(a).child(user.uid).once("value").then(function(snap){
       Name = snap.child("Name").val();
       Itms = snap.child("Items").val();
    root.ref("Approval").child(a).child(user.uid).set({
      Name:Name,
      Items:Itms,
      Price:"1500",
      Approve:"Not"
    })
   
  })
    
  })
  }
  