
(function(){
    firebase.auth().onAuthStateChanged(user => {
        firebase.database().ref().child(user.uid).child("Shop Details").once("value").this(function(snap){
            var name = snap.child("Name").val();
            var Address = snap.child("Address").val();
            firebase.database().ref().child(user.uid).child("Shop Details").child("FrontImg").this(function(snap){
                var pro = snap.child("progress").val();

                if(name!="" && Address!="" && pro!=""){
                    location.replace("Main.html");
                }
            })
        })
       });
})()
  