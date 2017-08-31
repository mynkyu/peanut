import React from 'react';
import * as firebase from 'firebase'

import facebook from './facebook.png'

class FBLogIn extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("componentDidMount");


    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '114048632608756',
        xfbml      : true,
        version    : 'v2.10'
      });
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


     firebase.auth().getRedirectResult().then(result => {
       if (result.credential) {
         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         const token = result.credential.accessToken;
         // ...
       }
       // The signed-in user info.
       const user = result.user;
       console.log(user)
     }).catch(error => {
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       // The email of the user's account used.
       const email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       const credential = error.credential;
       // ...
     });
  }
  //
  // checkLoginState(event) {
  //       if (event.authResponse) {
  //         // User is signed-in Facebook.
  //         const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  //           unsubscribe();
  //           // Check if we are already signed-in Firebase with the correct user.
  //           if (!isUserEqual(event.authResponse, firebaseUser)) {
  //             // Build Firebase credential with the Facebook auth token.
  //             // [START facebookcredential]
  //             const credential = firebase.auth.FacebookAuthProvider.credential(
  //                 event.authResponse.accessToken);
  //             // [END facebookcredential]
  //             // Sign in with the credential from the Facebook user.
  //             // [START authwithcred]
  //             firebase.auth().signInWithCredential(credential).catch(error => {
  //               // Handle Errors here.
  //               const errorCode = error.code;
  //               const errorMessage = error.message;
  //               // The email of the user's account used.
  //               const email = error.email;
  //               // The firebase.auth.AuthCredential type that was used.
  //               const credential = error.credential;
  //               // [START_EXCLUDE]
  //               if (errorCode === 'auth/account-exists-with-different-credential') {
  //                 alert('You have already signed up with a different auth provider for that email.');
  //                 // If you are using multiple auth providers on your app you should handle linking
  //                 // the user's accounts here.
  //               } else {
  //                 console.error(error);
  //               }
  //               // [END_EXCLUDE]
  //             });
  //             // [END authwithcred]
  //           } else {
  //             // User is already signed-in Firebase with the correct user.
  //           }
  //         });
  //       } else {
  //         // User is signed-out of Facebook.
  //         // [START signout]
  //         firebase.auth().signOut();
  //         // [END signout]
  //       }
  //     }
  //     // [END facebookcallback]
  //     /**
  //      * Check that the given Facebook user is equals to the  given Firebase user
  //      */
  //     // [START checksameuser]
  //     function isUserEqual(facebookAuthResponse, firebaseUser) {
  //       if (firebaseUser) {
  //         const providerData = firebaseUser.providerData;
  //         for (let i = 0; i < providerData.length; i++) {
  //           if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
  //               providerData[i].uid === facebookAuthResponse.userID) {
  //             // We don't need to re-auth the Firebase connection.
  //             return true;
  //           }
  //         }
  //       }
  //       return false;
  //     }
  //     // [END checksameuser]
  //     /**
  //      * initApp handles setting up UI event listeners and registering Firebase auth listeners:
  //      *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
  //      *    out, and that is where we update the UI.
  //      */
  //     function initApp() {
  //       // Listening for auth state changes.
  //       // [START authstatelistener]
  //       firebase.auth().onAuthStateChanged(user => {
  //         if (user) {
  //           // User is signed in.
  //           const displayName = user.displayName;
  //           const email = user.email;
  //           const emailVerified = user.emailVerified;
  //           const photoURL = user.photoURL;
  //           const isAnonymous = user.isAnonymous;
  //           const uid = user.uid;
  //           const providerData = user.providerData;
  //           // [START_EXCLUDE]
  //           document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
  //           document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
  //           // [END_EXCLUDE]
  //         } else {
  //           // User is signed out.
  //           // [START_EXCLUDE]
  //           document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
  //           document.getElementById('quickstart-account-details').textContent = 'null';
  //           // [END_EXCLUDE]
  //         }
  //       });
  //       // [END authstatelistener]
  //     }
  //     initApp();
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithRedirect(provider);
  }

  facebookShare() {
    window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object:'https://developers.facebook.com/docs/',
      })
    }, response => {});
  }

  render(){
    return (
      <div>
        <img src={facebook} title="facebook login" alt="facebook" onClick={this.facebookLogin} />
        <button onClick={this.facebookShare}> 공유 </button>
      </div>
    );
  }
}

export default FBLogIn;
