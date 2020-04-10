
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
      root.ref("Name").child("name").once("value").then(function(snap){
        var Name = snap.child("name").val();
        var Itms = snap.child("Items").val();
        var price = snap.child("Price").val();
        var button = document.createElement('input');
                      
        // button.onclick=GetTableValues(childKey)
      button.setAttribute('type', 'button');
      button.setAttribute('value', 'Bill It');
      button.setAttribute('onclick', 'Bill()');
      button.setAttribute("class", "btn btn-info btn-xs");
      button.setAttribute("data-toggle","modal");
      button.setAttribute("data-target","#item_form");
      if(Name!="" && Itms!=""){
        var table  = document.getElementsByClassName("table1")[0];
        var newrow = table.insertRow(1);
        var cel1 = newrow.insertCell(0);
        var cel2 = newrow.insertCell(1);
        var cel3 = newrow.insertCell(2);
        var res,res1;
       
        cel1.innerHTML=Name
        cel2.innerHTML=Itms;
        cel3.appendChild(button);
      }
      })
      /*root.ref("Approval").once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          root.ref("Approval").child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              console.log(user.uid==childSnapshot1.key);
              console.log(childSnapshot1.key);
              
              
              if(user.uid==childSnapshot1.key){
      root.ref("Approval").child(childKey).child(user.uid).once("value").then(function(snap){*/
        
        root.ref("Approval").child("name").once("value").then(function(snap){
          var name1 = snap.child("name").val();
          var itms1 = snap.child("Items").val();
          var Pric = snap.child("Price").val();
        var table  = document.getElementsByClassName("table2")[0];
        var newrow = table.insertRow(1);
        var cel1 = newrow.insertCell(0);
        var cel2 = newrow.insertCell(1);
        var cel3 = newrow.insertCell(2);
       
        cel1.innerHTML=name1;
        cel2.innerHTML=itms1;
        cel3.innerHTML = Pric;
        
      })
    })
})()
     /* root1.once("value").then(function(snap){
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
                      
                    // button.onclick=GetTableValues(childKey)
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Bill It');
                  button.setAttribute('onclick', 'Bill(\''+childKey+'\')');
                  button.setAttribute("class", "btn btn-info btn-xs");
                  button.setAttribute("data-toggle","modal");
                  button.setAttribute("data-target","#item_form");
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
      root.ref("Approval").once("value").then(function(snap){
        snap.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          root.ref("Approval").child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              console.log(user.uid==childSnapshot1.key);
              console.log(childSnapshot1.key);
              
              
              if(user.uid==childSnapshot1.key){
      root.ref("Approval").child(childKey).child(user.uid).once("value").then(function(snap){
        var table  = document.getElementsByClassName("table2")[0];
        var newrow = table.insertRow(1);
        var cel1 = newrow.insertCell(0);
        var cel2 = newrow.insertCell(1);
        var cel3 = newrow.insertCell(2);
       
        cel1.innerHTML=Name;
        cel2.innerHTML=Itms;
        cel3.innerHTML = price;
        
      })
    }
    })
    
  })
  })

})
      })
});
    })()
    */
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
      root.ref("Approval").child("name").set({
        name:"Sumanth",
        Items:"10",
        Price:"7090"
      })
    root.ref("Orders").child(a).child(user.uid).once("value").then(function(snap){
       Name = snap.child("Name").val();
       Itms = snap.child("Items").val();
       /*one = snap.child("items1").val();
       two = snap.child("items2").val();
       three = snap.child("items3").val();
       four = snap.child("items4").val();
       five = snap.child("items5").val();
       six = snap.child("items6").val();
       seven = snap.child("items7").val();
       eight = snap.child("items8").val();
       nine = snap.child("items9").val();
       ten = snap.child("items10").val();
       qone = snap.child("Quan1").val();
       qtwo = snap.child("Quan2").val();
       qthree = snap.child("Quan3").val();
       qfour = snap.child("Quan4").val();
       qfive = snap.child("Quan5").val();
       qsix = snap.child("Quan6").val();
       qseven = snap.child("Quan7").val();
       qeight = snap.child("Quan8").val();
       qnine = snap.child("Quan9").val();
       qten = snap.child("Quan10").val();

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
        document.getElementById("item_quantity_1").value=qone;
        document.getElementById("item_quantity_2").value=qtwo;
        document.getElementById("item_quantity_3").value=qthree;
        document.getElementById("item_quantity_4").value=qfour;
        document.getElementById("item_quantity_5").value=qfive;
        document.getElementById("item_quantity_6").value=qsix;
        document.getElementById("item_quantity_7").value=qseven;
        document.getElementById("item_quantity_8").value=qeight;
        document.getElementById("item_quantity_9").value=qnine;
        document.getElementById("item_quantity_10").value=qten;
      */
    root.ref("Approval").child(a).child(user.uid).set({
      Name:Name,
      Items:Itms,
      Price:"7090",
      Approve:"Not"
    })
 
    root.ref("Orders").child(a).child(user.uid).remove();
  })
    
  })
 
  }
  function delete1(){
    firebase.database().ref("Name").child("name").remove();
  }
  
  