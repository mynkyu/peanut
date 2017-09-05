import * as firebase from 'firebase'
import * as event from './Event';

function parseProfile(profile) {
    return {
        uid : profile.uid,
        name : profile.displayName,
        email : profile.email,
        photoURL : profile.photoURL,
        facebookURL : "https://facebook.com/" + profile.providerData[0].uid
    }
}

export function updateProfile(user) {
    const profile = parseProfile(user)
    firebase.database().ref().child('profile').child(profile.uid).set(profile)
    return profile
}

export var apply = function (profile, comment, imageURL, similarity) {
    return new Promise(function (resolve, reject) {
        const onComplete = function(error) {
            if (error) {
                reject(Error("실패!!"));
            } else {
                resolve("완료");
            }
        };
        
        const eventName = event.getEventName()
        firebase.database().ref().child('challenger').child(eventName).child(profile.uid).set({
            uid : profile.uid,
            name : profile.name,
            facebookURL : profile.facebookURL,
            imageURL : imageURL,
            similarity : similarity,
            comment : comment,
            vote : 0
        }, onComplete)
    });
};