var id=1;
var stores=[];
(function(){
    firebase.auth().onAuthStateChanged(user => {
        var root =  firebase.database();
        var root1 =  firebase.database().ref("Locations");
        root1.once("value").then(function(snap){
            snap.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              root1.child(childKey).once("value").then(function(snap1){
          root.ref(childKey).child("Shop Details").once("value").then(function(snap){
          var name = snap.child("Name").val();
          var address = snap.child("Address").val();
          var shopName = snap.child("ShopName").val();
          var PhoneNum = snap.child("MobileNumber").val();
          root.ref(childKey).child("Shop Details").child("ShopImg").once("value").then(function(snap){
            var shop = snap.child("URL").val();

            root.ref("Locations").child(childKey).once("value").then(function(snap){
                lat = snap.child("Latitude").val();
                long = snap.child("Longitude").val();
            stores.push({shopName: shopName,shopType: "Kirana and General Stores",shopAddress: address,name: name,phone: PhoneNum,email: "email@gmail.com",lat: lat,long: long});
            var head = document.getElementById('head');
            var cont = document.createElement('div');
            cont.setAttribute("class","container-fluid text-left");
            cont.setAttribute("id","shop_details_container");

            cont.innerHTML = '<div class="row" id="shop_details_less"> <!--Half Container : contains shop details,order now button,shop img,more details button--><div class="col-4 my-auto" id="shop_img"> <img id="s_img_'+id+'" class="rounded img-fluid s-img" alt="Placeholder image" src="images/Rectangle 2.png"><!--Shop Image--></div><div class="col-8 my-auto" id="shop_details"><div class="card col-8"><div class="card-body"><h5 class="card-title" id="s_name_'+id+'">'+shopName+'</h5><!--Shop Name--><h6 class="card-subtitle mb-2 text-muted" id="s_cat_'+id+'">Kirana and General</h6><!--Shop Type--><p class="card-text" id="s_addr_'+id+'">'+address+'</p><!--Shop Address--></div></div><button class="btn btn-primary btn-order" id="order_now_'+id+'" onclick=showPopup('+id+')>Order Now</button><!--Order Now Button--></div></div><button class="btn-text btn-details collapsed" id="details_btn_'+id+'" data-toggle="collapse" role="button" data-target="#shop_details_more_coll_'+id+'" aria-expanded="false" aria-controls="collapseExample"><span id="md">+More Details</span><span id="ld">-Less Details</span></button><!--button shows and hides  other details of shop--><!--Start of hidden part of shop container--><div class="collapse" id="shop_details_more_coll_'+id+'"><!--Second Half Container--><div class="row" id="shop_details_more"><div class="col-6 sh-map" id="sh_map_'+id+'"></div><!--Map Box--><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3Mp-nbpxvDIUmjL9MWCDil6AypsFcCVQ&callback=initMap"></script><div class="col-6" id="shop_keeper_details"><!--Shop Keeper details box--><div class="row" id="sh_det" style="height: 100%;"><div class="col-8 my-auto"><div class="card col-md-8 my-auto" id="sk_card"><div class="card-body" id="sk_card_body"><h5 class="card-title sk-name" id="sk_name_'+id+'">'+name+'</h5><!--Shop keeper name--><p class="card-subtitle sk-phone" id="sk_phone_'+id+'">+91'+PhoneNum+'</p><!--Shop Keeper number--><p class="card-subtitle sk-email" id="sk_email_'+id+'">saixxxxxxxxxx@gmail.com</p><!--Shop Keeper email--></div></div></div><div class="col-4 my-auto" id="sk_img_div"><img class="rounded img-fluid" id="sk_img_'+id+'" src="images/Rectangle 4.png"/></div><!--Shop keeper image--></div></div></div></div>';

            head.appendChild(cont);
            
            var map = new google.maps.Map(document.getElementById('sh_map_'+id), {
              center: {lat: lat, lng: long},
              zoom: 15
              });
            var marker = new google.maps.Marker({position: {lat: lat, lng: long},draggable: false,map: map,title: shopName});
            id++;
          
          
         
            })
        
        })
        
  })
        })
      })
    })
      });

})()



function showPopup(index) {
  document.getElementById("modal_title").innerHTML = stores[index-1]['shopName'];
  $('#item_form').modal('show');
}