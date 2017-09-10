import * as firebase from 'firebase'
import * as app from './App'

export function init() {
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
}

export function signInWithPopup() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithPopup(provider);
}

export function signInWithRedirect() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithRedirect(provider);
}

export function sharePeanut() {
    window.FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: app.getURL(),
        })
    }, response => {});
}

export function shareChallenger(uid) {
    const path = app.getURL() + "ranking/challenger/" + uid
    console.log('facebook: ' + path)
    window.FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: path,
        })
    }, response => {});
}