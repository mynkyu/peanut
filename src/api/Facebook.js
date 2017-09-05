import * as firebase from 'firebase'

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