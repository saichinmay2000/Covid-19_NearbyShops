
(function(){
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("email").innerHTML=user.email;
       /*firebase.database().ref("Name").child("name").set({
          name:"Sumanth",
          Items:"10",
          Price:"7090"
        })*/
        
        var root12 =  firebase.database().ref(user.uid).child("Shop Details");
        root12.once("value").then(function(snap){
          snap.forEach(function(childSnapshot) {
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
        })
      })

      var root =  firebase.database();
      var root1 =  firebase.database().ref("Orders");
      root1.once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          
          root1.child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              console.log(childSnapshot1.key);
              console.log(user.uid);
              
              
              console.log(user.uid==childSnapshot1.key);
              if(user.uid==childSnapshot1.key){
                
                root1.child(childKey).child(user.uid).once("value").then(function(snap2){
                  console.log(childKey);
                  
                  var date = snap2.child("Date").val();
                  var Name = snap2.child("Name").val();
                  var Itms = snap2.child("Items").val();
                  var button = document.createElement('input');
                    console.log(Name);
                    
                  // button.onclick=GetTableValues(childKey)
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Bill It');
                button.setAttribute('onclick', 'Bill(\''+childKey+'\')');
                button.setAttribute("class", "btn btn-info btn-xs");
                button.setAttribute("data-toggle","modal");
                button.setAttribute("data-target","#myModal");
                  var table  = document.getElementsByClassName("table1")[0];
                  var newrow = table.insertRow(1);
                  var cel1 = newrow.insertCell(0);
                  var cel2 = newrow.insertCell(1);
                  var cel3 = newrow.insertCell(2);
                  var res,res1;
                 
                  cel1.innerHTML=Name
                  cel2.innerHTML="10";
                  cel3.appendChild(button);
            })
              }
            })
          })
        })
      })
     
})
})()

    
function Logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.replace("index.html")
  }).catch(function(error) {
  // An error happened.
  });
  }

  function Bill(){
    var Name,Itms;
    var one,two,three,four,five,six,seven,eight,nine,qone,qtwo,qthree,qfour,qfive,qsix,qseven,qeight,qnine,qten;
    var root = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      
    root.ref("Orders").child(a).child(user.uid).once("value").then(function(snap){
       Name = snap.child("Name").val();
       Itms = snap.child("Items").val();
       one = snap.child("items1").val();
       two = snap.child("items2").val();
       three = snap.child("items3").val();
       four = snap.child("items4").val();
       five = snap.child("items5").val();
       six = snap.child("items6").val();
       seven = snap.child("items7").val();
       eight = snap.child("items8").val();
       nine = snap.child("items9").val();
       ten = snap.child("items10").val();

       document.getElementById("item_name_1").value=one;
       document.getElementById("item_name_2").value=two;
       document.getElementById("item_name_3").value=three;
        document.getElementById("item_name_4").value=four;
        document.getElementById("item_name_5").value=five;
        document.getElementById("item_name_6").value=six;
        document.getElementById("item_name_7").value=seven;
        document.getElementById("item_name_8").value=eight;
        document.getElementById("item_name_9").value=nine;
        document.getElementById("item_name_10").value=ten;
    
 
    root.ref("Orders").child(a).child(user.uid).remove();
  })
    
  })
 
  }
  function delete1(){
    firebase.database().ref("Approval").child("name").set({
      name:"Sumanth",
      Items:"10",
      Price:"7090"
    })
   return true;
    
  }
  
  