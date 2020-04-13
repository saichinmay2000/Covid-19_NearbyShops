var childkey;
(function(){
    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("email").innerHTML=user.email;
      
        var root12 =  firebase.database().ref(user.uid).child("Shop Details");
        root12.once("value").then(function(snap){
          snap.forEach(function(childSnapshot) {
          
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
   
      
      if(Itms==10){
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
          childkey=childKey;
          root1.child(childKey).once("value").then(function(snap1){
            snap1.forEach(function(childSnapshot1) {
              console.log(childSnapshot1.key);
              console.log(user.uid);
              
              
              console.log(user.uid==childSnapshot1.key);
              if(user.uid==childSnapshot1.key){
      root.ref("Approval").child(childKey).child(user.uid).once("value").then(function(snap){*/
        
       
    })
    /*firebase.database().ref("Approval").on("child_added",function(snap){
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
    
  })*/
})()

(function(){
  if(delete1()){
    console.log("Delete");
    
    
  }
})
     /* root1.once("value").then(function(snap){
          snap.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            
            root1.child(childKey).once("value").then(function(snap1){
              snap1.forEach(function(childSnapshot1) {
                console.log(childSnapshot1.key);
                console.log(user.uid);
                
                
                root1.child(childKey).child(user.uid).once("value").then(function(snap2){
                  console.log(childKey);
                  root.ref("Approval").child(childKey).child(user.uid).once("value").then(function(snap){
                    var CustName = snap.child("Name").val();
                  var date = snap2.child("Date").val();
                  var Name = snap2.child("Name").val();
                  var Itms = snap2.child("Items").val();
                  var button = document.createElement('input');
                    console.log(Name);
                    console.log(CustName);
                    
                  // button.onclick=GetTableValues(childKey)
                  var table  = document.getElementsByClassName("table1")[0];
                  var newrow = table.insertRow(1);
                  var cel1 = newrow.insertCell(0);
                  var cel2 = newrow.insertCell(1);
                  var cel3 = newrow.insertCell(2);
                  var res,res1;
                 if(CustName==null){
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Bill It');
                  button.setAttribute('onclick', 'Bill(\'' + childKey + '\',\'' + Name + '\')');
                  button.setAttribute("class", "btn btn-info btn-xs");
                  button.setAttribute("data-toggle","modal");
                  button.setAttribute("data-target","#myModal");
                 }
                 else{
                  button.setAttribute('type', 'button');
                  button.setAttribute('value', 'Deliverd');
                  button.setAttribute("class", "btn btn-info btn-xs");
                 }
                  cel1.innerHTML=Name
                  cel2.innerHTML="10";
                  cel3.appendChild(button);
                  
                })
            })
              }
             
            })
           
          })
          firebase.database().ref("Approval").child(childKey).on("child_added",function(snap){
            var name1 = snap.child("Name").val();
            var Pric = snap.child("Amount").child("Total").val();
          var table  = document.getElementsByClassName("table2")[0];
          var newrow = table.insertRow(1);
          var cel1 = newrow.insertCell(0);
          var cel2 = newrow.insertCell(1);
          var cel3 = newrow.insertCell(2);
         
          cel1.innerHTML=name1;
          cel2.innerHTML="10";
          cel3.innerHTML = Pric;
           // })
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
var child;
  function Bill(a,b){
    var Name,Itms;
    var one,two,three,four,five,six,seven,eight,nine,qone,qtwo,qthree,qfour,qfive,qsix,qseven,qeight,qnine,qten;
    var root = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      
      
      
      delete1(a,user.uid);
      child=a;
    root.ref("Orders").child(a).child(user.uid).once("value").then(function(snap){
       Name = snap.child("Name").val();
       Itms = snap.child("Items").val();
       one = snap.child("item1").val();
       two = snap.child("item2").val();
       three = snap.child("item3").val();
       four = snap.child("item4").val();
       five = snap.child("item5").val();
       six = snap.child("item6").val();
       seven = snap.child("item7").val();
       eight = snap.child("item8").val();
       nine = snap.child("item9").val();
       ten = snap.child("item10").val();
       document.getElementById("CustName").innerHTML=b;
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
        document.getElementById("item_price_1").value="";
        document.getElementById("item_price_2").value="";
        document.getElementById("item_price_3").value="";
        document.getElementById("item_price_4").value="";
        document.getElementById("item_price_5").value="";
        document.getElementById("item_price_6").value="";
        document.getElementById("item_price_7").value="";
        document.getElementById("item_price_8").value="";
        document.getElementById("item_price_9").value="";
        document.getElementById("item_price_10").value="";
        document.getElementById("amt").value="";
        
  })
    
  })
 
  }
  
  var array = Array();
  var q1,q2,q3,q4,q5,q6,q7,q8,q9,q10;
  function sum1(){
    
    q1 = parseInt(document.getElementById("item_price_1").value);
    q2 = parseInt(document.getElementById("item_price_2").value);
    q3 = parseInt(document.getElementById("item_price_3").value);
    q4 = parseInt(document.getElementById("item_price_4").value);
    q5 = parseInt(document.getElementById("item_price_5").value);
    q6 =parseInt(document.getElementById("item_price_6").value);
    q7 = parseInt(document.getElementById("item_price_7").value);
    q8 = parseInt(document.getElementById("item_price_8").value);
    q9 = parseInt(document.getElementById("item_price_9").value);
    q10 =parseInt(document.getElementById("item_price_10").value);
if(isNaN(q1)){
  q1=0;
}
if(isNaN(q2)){
  q2=0;
}
if(isNaN(q3)){
  q3=0;
}
if(isNaN(q4)){
  q4=0;
}
if(isNaN(q5)){
  q5=0;
}
if(isNaN(q6)){
  q6=0;
}
if(isNaN(q7)){
  q7=0;
}
if(isNaN(q8)){
  q8=0;
}
if(isNaN(q9)){
  q9=0;
}
if(isNaN(q10)){
  q10=0;
}
    console.log(q1);
    console.log(q2);
    console.log(q3);
    console.log(q4);
    console.log(q5);
    console.log(q6);
    console.log(q7);
    console.log(q8);
    console.log(q9);
    console.log(q10);
    
    array[0]=q1;
    array[1]=q2;
    array[2]=q3;
    array[3]=q4;
    array[4]=q5;
    array[5]=q6;
    array[6]=q7;
    array[7]=q8;
    array[8]=q9;
    array[9]=q10;
    var sum = array.reduce(function(acc, val) { return acc + val; }, 0)
 console.log(sum);
 
 document.getElementById("amt").innerHTML=sum;
 firebase.auth().onAuthStateChanged(user => {
  firebase.database().ref("Approval").child(child).child(user.uid).child("Amount").set({
    amt1:q1,
      amt2:q2,
      amt3:q3,
      amt4:q4,
      amt5:q5,
      amt6:q6,
      amt7:q7,
      amt8:q8,
      amt9:q9,
      amt10:q10,
      Total:sum
  })
})
  }
  
  
  function delete1(a,b){
    
   firebase.auth().onAuthStateChanged(user => {
    var root = firebase.database();
    root.ref("Orders").child(a).child(user.uid).once("value").then(function(snap){
      var i1 = snap.child("item1").val();
      var i2 = snap.child("item2").val();
      var i3 = snap.child("item3").val();
      var i4 = snap.child("item4").val();
      var i5 = snap.child("item5").val();
      var i6 = snap.child("item6").val();
      var i7 = snap.child("item7").val();
      var i8 = snap.child("item8").val();
      var i9 = snap.child("item9").val();
      var i10 = snap.child("item10").val();
      var Name = snap.child("Name").val();
      var Url = snap.child("URL").val();

      firebase.database().ref("Approval").child(a).child(user.uid).set({
        Name:Name,
        URL:Url,
        item1:i1,
        item2:i2,
        item3:i3,
        item4:i4,
        item5:i5,
        item6:i6,
        item7:i7,
        item8:i8,
        item9:i9,
        item10:i10,
        
        Request:"Not Accepted"

      })

    })

    })
    console.log(q2);
    
    
    
    //firebase.database().ref("Orders").child(a).child(b).remove();
    
    
  }
*/