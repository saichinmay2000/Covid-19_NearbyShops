var uiConfig = {  
    callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          },
          uiShown: function() {
          }
        },
        signInFlow: 'popup',
    signInSuccessUrl: '#',  
    signInOptions: [  
     firebase.auth.PhoneAuthProvider.PROVIDER_ID  
    ],  
    tosUrl: '#'  
   };  
   var ui1 = new firebaseui.auth.AuthUI(firebase.auth());  
   ui1.start('#firebaseui-auth-container1', uiConfig);  