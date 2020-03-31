var ui = new firebaseui.auth.AuthUI(firebase.auth());  
   var uiConfig = {  
    callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          },
          uiShown: function() {
          }
        },
        signInFlow: 'popup',
    signInSuccessUrl: 'shopreg.html',  
    signInOptions: [  
     firebase.auth.GoogleAuthProvider.PROVIDER_ID,  
     firebase.auth.EmailAuthProvider.PROVIDER_ID  
    ],  
    tosUrl: 'shopreg.html'  
   }; 
   ui.start('#firebaseui-auth-container', uiConfig); 
