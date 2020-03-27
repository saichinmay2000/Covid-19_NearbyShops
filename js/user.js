
(function(){
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("email").innerHTML=user.email;
        
        var root =  firebase.database().ref(user.uid).child("Shop Details");
        root.once("value").then(function(snap){
          var veri = snap.child("verify").val();
          var deco = document.getElementById("veri");
          deco.innerHTML=veri;
          deco.style.color='white';
          deco.style.fontStyle='bold';
          deco.style.backgroundColor = "LimeGreen";
          deco.style.borderRadius = "10px";
          console.log(veri);
          
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

  