

(function(){
    
    firebase.auth().onAuthStateChanged(user => {
        var root1 =  firebase.database().ref().child("Customers").child(user.uid);
        
       root1.once("value").then(function(snap){
            var name = snap.child("Name").val();
            var Address = snap.child("Address").val();   
            var email = snap.child("Email").val();
            var Phone = user.phoneNumber; 
            var profile = snap.child("URL").val();
            console.log(name);
            document.getElementById("UserName").innerHTML = name;
            document.getElementById("Address").innerHTML = Address;
            document.getElementById("Phone").innerHTML = Phone;
            document.getElementById("UserID").innerHTML = user.uid;   
            document.getElementById("UserEmail").innerHTML = email;   
            document.getElementById("profile").src=profile;
            

    })


  
});
})()






  