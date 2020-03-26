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
  var name = document.getElementById("username").value;
  var shpname = document.getElementById("shopname").value;
  var address = document.getElementById("address").value;
  var mobnum = document.getElementById("phone").value;
  var license_number = document.getElementById("license_number").value;
  var ShopOwner = document.getElementById("btn").value;
  var ShopImg1 = document.getElementById("btn").value;
  var LicFrn = document.getElementById("btn").value;
  var LicBac = document.getElementById("btn").value;
  if(name!="" && shpname!="" && address!="" && mobnum!="" && license_number!="" && ShopOwner!="" && ShopImg1!="" && LicFrn!="" && LicBac!=""){
  var root = firebase.database().ref(user.uid).child("Shop Details");
  firebase.database().ref(user.uid).child("Shop Details").set({
  Name: name,
  ShopName:shpname,
  Address: address,
  MobileNumber: mobnum,
  License_number:license_number
});
var storage = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"FrontImage.jpg");
var storage1 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"BackImage.jpg");
var storage2 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"ShopImage.jpg");
var storage3 = firebase.storage().ref("/Images/"+"/"+user.uid+"/"+"OwnerImage.jpg");
var metadata = {
  contentType: 'image/jpeg',
};

var uploadTask = storage.put(FrontImg);
var uploadTask1 = storage1.put(BackImg);
var uploadTask2 = storage2.put(ShopImg);
var uploadTask3 = storage3.put(OwnerImg);

var progress1,progress2,progress3,progress4;
uploadTask.on('state_changed', function(snapshot){
   progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //console.log('Upload is ' + progress1 + '% done');
  
  document.getElementById("myProgress1").style.width = progress1+"%";
  document.getElementById("myProgress1").innerHTML = progress1+"%";

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
   // console.log('File available at', downloadURL1);
    firebase.database().ref(user.uid).child("Shop Details").child("FrontImg").set({
      URL:downloadURL1,
      progress:progress1
    });
    
  });
  });
  uploadTask1.on('state_changed', function(snapshot){
     progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('Upload is ' + progress2 + '% done');
    document.getElementById("myProgress2").style.width = progress2+"%";
    document.getElementById("myProgress2").innerHTML = progress2+"%";
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
      //console.log('File available at', downloadURL2);
      firebase.database().ref(user.uid).child("Shop Details").child("BackImg").set({
        URL:downloadURL2,
        progress:progress2
      });
    });
    });
    uploadTask2.on('state_changed', function(snapshot){
       progress3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress3 + '% done');
      document.getElementById("myProgress3").style.width = progress3+"%";
      document.getElementById("myProgress3").innerHTML = progress3+"%";
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
        //console.log('File available at', downloadURL3);
        firebase.database().ref(user.uid).child("Shop Details").child("ShopImg").set({
          URL:downloadURL3,
          progress:progress3
        });
      });
      });
      uploadTask3.on('state_changed', function(snapshot){
         progress4 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress4 + '% done');
        document.getElementById("myProgress4").style.width = progress4+"%";
        document.getElementById("myProgress4").innerHTML = progress4+"%";
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
         // console.log('File available at', downloadURL4);
          firebase.database().ref(user.uid).child("Shop Details").child("OwnerImg").set({
            URL:downloadURL4,
            progress:progress4
          });
        });
        });
        document.getElementById("Progress").style.display = "block";
       
        document.getElementById("details").style.display = "none";
        document.getElementById("btn12").style.display = "block";
        
      }
      else{
        window.alert("Enter all the fields");
      }
      
      
      
});
}
function NextPage(){
  location.replace("Main.html");
}
