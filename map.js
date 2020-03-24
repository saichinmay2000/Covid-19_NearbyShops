

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var lat,logi;
function showPosition(position) {
  lat = position.coords.latitude;
  logi = position.coords.longitude;
  
  console.log(position.coords.latitude);
  console.log(position.coords.longitude); 
}
var FrontImg,BackImg,ShopImg,OwnerImg;
function Front(){
  FrontImg = event.target.files[0];
  console.log(FrontImg.name);
}
function Back(){
  BackImg = event.target.files[0];
  console.log(BackImg.name);
}
function Shop(){
  ShopImg = event.target.files[0];
  console.log(ShopImg.name);
}
function Owner(){
  OwnerImg = event.target.files[0];
  console.log(OwnerImg.name);
}

function store(){
  firebase.auth().onAuthStateChanged(user => {
  var name = document.getElementById("name").value;
  var shpname = document.getElementById("shpname").value;
  var address = document.getElementById("address").value;
  var mobnum = document.getElementById("mobnum").value;
  var shoplicense = document.getElementById("shoplicense").value;
  var frontlicense = document.getElementById("frontlicense").value;
  var backlicense = document.getElementById("backlicense").value;
  var shoppic = document.getElementById("shoppic").value;
  var shopowner = document.getElementById("shopowner").value;
  if(name!="" && shpname!="" && address!="" && mobnum!="" && shoplicense!="" && frontlicense!="" && backlicense!="" && shoppic!="" && shopowner!=""){
  var root = firebase.database().ref(user.uid).child("Shop Details");
  firebase.database().ref(user.uid).child("Shop Details").set({
  Name: name,
  ShopName:shpname,
  Address: address,
  MobileNumber: mobnum,
  ShopLiscense:shoplicense,
  Latitude:lat,
  Longitude:logi
});
var storage = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"FrontImage");
var storage1 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"BackImage");
var storage2 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"ShopImage");
var storage3 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"OwnerImage");
var metadata = {
  contentType: 'image/jpeg',
};

var uploadTask = storage.put(FrontImg);
var uploadTask1 = storage1.put(BackImg);
var uploadTask2 = storage2.put(ShopImg);
var uploadTask3 = storage3.put(OwnerImg);

uploadTask.on('state_changed', function(snapshot){
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'  
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
  }, function(error) {
  }, function() {
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL1) {
    console.log('File available at', downloadURL1);
    var imgdata=
        {
          "FrontImg":downloadURL1,
        };
        var newdata = root.push();

        newdata.set(imgdata,function(error){
          if(error){
            console.log("Error to insert");
          }
          else{
            console.log("Inserted Data ");
            
          }
        })
    
  });
  });
  uploadTask1.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'  
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    }, function(error) {
    }, function() {
    uploadTask1.snapshot.ref.getDownloadURL().then(function(downloadURL2) {
      console.log('File available at', downloadURL2);
      var imgdata=
        {
          "BackImg":downloadURL2,
        };
        var newdata = root.push();

        newdata.set(imgdata,function(error){
          if(error){
            console.log("Error to insert");
          }
          else{
            console.log("Inserted Data ");
            
          }
        })
    });
    });
    uploadTask2.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'  
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
      }, function(error) {
      }, function() {
      uploadTask2.snapshot.ref.getDownloadURL().then(function(downloadURL3) {
        console.log('File available at', downloadURL3);
        var imgdata=
        {
          "ShopImg":downloadURL3,
        };
        var newdata = root.push();

        newdata.set(imgdata,function(error){
          if(error){
            console.log("Error to insert");
          }
          else{
            console.log("Inserted Data ");
            
          }
        })
      });
      });
      uploadTask3.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'  
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        }, function(error) {
        }, function() {
        uploadTask3.snapshot.ref.getDownloadURL().then(function(downloadURL4) {
          console.log('File available at', downloadURL4);
          var imgdata=
        {
          "OwnerImg":downloadURL4,
        };
        var newdata = root.push();

        newdata.set(imgdata,function(error){
          if(error){
            console.log("Error to insert");
          }
          else{
            console.log("Inserted Data ");
            
          }
        })
        });
        });
        
      }
      else{
        window.alert("Enter all the fields");
      }
});
}