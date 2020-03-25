(function(){
    firebase.auth().onAuthStateChanged(user => {
        var root =  firebase.database().ref().child(user.uid).child("Shop Details");
       root.once("value").then(function(snap){
            var name = snap.child("Name").val();
            var Address = snap.child("Address").val();   
            var Phone = snap.child("MobileNumber").val(); 
            document.getElementById("UserName").innerHTML = name;
            document.getElementById("Address").innerHTML = Address;
            document.getElementById("Phone").innerHTML = Phone;
            document.getElementById("UserID").innerHTML = user.uid;   
            document.getElementById("UserEmail").innerHTML = user.email;       
    })
    var root1 = firebase.database().ref().child(user.uid).child("Shop Details");
    root1.child("FrontImg").once("value").then(function(front){
        var url =  front.child("URL").val();
        document.getElementById("front").src = url;
    });
    root1.child("BackImg").once("value").then(function(front){
        var url =  front.child("URL").val();
        document.getElementById("back").src = url;
    });
    root1.child("ShopImg").once("value").then(function(front){
        var url =  front.child("URL").val();
        document.getElementById("shop").src = url;
    });
    root1.child("OwnerImg").once("value").then(function(front){
        var url =  front.child("URL").val();
        document.getElementById("owner").src = url;
        document.getElementById("Owner").src = url;
    });
    
  
});
})()

  