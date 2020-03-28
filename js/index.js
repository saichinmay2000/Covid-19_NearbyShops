(function(){
  var productname = "AIzaSyCrXaMutwiZ5wkQnZlN46XGnQpx1kVqhqM";
  var firebaseConfig = {
    apiKey: eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 3=[\'e\'];(5(0,4){2 1=5(8){d(--8){0[\'c\'](0[\'b\']())}};1(++4)}(3,a));2 7=5(0,4){0=0-6;2 1=3[0];9 1};7(\'6\');',15,15,'_0x465cb8|_0x468f89|var|_0x34bb|_0x34bb9c|function|0x0|_0x468f|_0x1e94f3|return|0x18b|shift|push|while|AIzaSyCrXaMutwiZ5wkQnZlN46XGnQpx1kVqhqM'.split('|'),0,{})),
    databaseURL: "https://shopkeeper-4f9d9.firebaseio.com",
    storageBucket: "shopkeeper-4f9d9.appspot.com",
    authDomain: "shopkeeper-4f9d9.firebaseapp.com"
};  
firebase.initializeApp(firebaseConfig);  
/*
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('p 4={6:"7",8:"2-0.9.3",a:"b://2-0.c.3",d:"2-0",e:"2-0.f.3",h:"5",i:"1:5:j:k",l:"m-n"};o.g(4);',26,26,'4f9d9||shopkeeper|com|firebaseConfig|555084841662|apiKey|AIzaSyCrXaMutwiZ5wkQnZlN46XGnQpx1kVqhqM|authDomain|firebaseapp|databaseURL|https|firebaseio|projectId|storageBucket|appspot|initializeApp|messagingSenderId|appId|web|a29abe40ba32d98ad914ef|measurementId|G|YDD47BBRYH|firebase|var'.split('|'),0,{}))
*/

document.getElementById("Progress").style.display = "none";
document.getElementById("btn12").style.display = "none";

firebase.auth().onAuthStateChanged(user => {
  var root = firebase.database().ref(user.uid).child("Shop Details");
  root.once("value").then(function(snap){
      var name = snap.child("Name").val();
      var Address = snap.child("Address").val();
      root.child("FrontImg").once("value").then(function(snap){
          var pro = snap.child("progress").val();

          if(name!=null && Address!=null && pro!=null){
              location.replace("Main.html");
          }
      })
  })
 });
 $('#invisible').remove();
})()
