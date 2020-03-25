(function(){
  var firebaseConfig = {
    apiKey: "AIzaSyCrXaMutwiZ5wkQnZlN46XGnQpx1kVqhqM",
    authDomain: "shopkeeper-4f9d9.firebaseapp.com",
    databaseURL: "https://shopkeeper-4f9d9.firebaseio.com",
    projectId: "shopkeeper-4f9d9",
    storageBucket: "shopkeeper-4f9d9.appspot.com",
    messagingSenderId: "555084841662",
    appId: "1:555084841662:web:a29abe40ba32d98ad914ef",
    measurementId: "G-YDD47BBRYH"
};  
firebase.initializeApp(firebaseConfig);  
document.getElementById("Progress").style.display = "none";
document.getElementById("btn12").style.display = "none";

firebase.auth().onAuthStateChanged(user => {
  var root=firebase.database().ref(user.uid).child("Shop Details");
  root.on("value",snap=>{
    var name = snap.child("Name").val();
     var shp = snap.child("Address").val();
    root.child("FrontImg").on("value",snap=>{
      var url = snap.child("url").val();
      if(url!="" && name!='"' && shp!=""){
        location.replace("Main.html");
      }
      else{
        console.log("Enter the details");
      }
    });
  });

});
})()
