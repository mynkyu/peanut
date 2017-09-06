import * as firebase from 'firebase'
import * as event from './Event';

const FIREBASE_SUCCESS = 200
const FIREBASE_FAIL = 400

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

export function getStorageFileName() {
    function d() {
        const date = new Date()
        return date.getTime()
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return event.getEventName() + "/" + s4() + s4() + s4() + s4() + s4() + d() ;
}

export var apply = function (profile, comment, imageURL, similarity) {
    return new Promise(function (resolve, reject) {
        const onComplete = function(error) {
            if (error) {
                reject(Error(FIREBASE_FAIL));
            } else {
                resolve(FIREBASE_SUCCESS);
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

function parseChallenger(data, rank) {
    return {
        uid : data.uid,
        name : data.name,
        facebookURL : data.facebookURL,
        imageURL : data.imageURL,
        similarity : data.similarity,
        comment : data.comment,
        vote : data.vote,
        rank : rank
    }
}

const LAST_RANK = 3
export var getRanking = function () {
    return new Promise(function (resolve, reject) {
        const eventName = event.getEventName()
        firebase.database().ref().child('challenger').child(eventName)
        .orderByChild('vote').limitToLast(LAST_RANK).once('value').then(function(snapshot){
            if (snapshot.exists()) {
                var challengersData = []
                var challengers = []
                var rank = 1
                
                snapshot.forEach(function(childSnapshot){
                    const data = childSnapshot.val()
                    challengersData.push(data)
                })

                const length = challengersData.length
                for (var i = length; i > 0; i--) {
                    challengers.push(parseChallenger(challengersData[i-1], rank))
                    rank++
                }

                resolve(challengers)
            } else {
                reject(Error(FIREBASE_FAIL))
            }
        })
    });
}

export var getChallenger = function (uid) {
    return new Promise(function (resolve, reject) {
        const eventName = event.getEventName()
        firebase.database().ref().child('challenger').child(eventName).child(uid).once('value').then(function(snapshot){
            if (snapshot.exists()) {
                const challenger = parseChallenger(snapshot.val(), 0)
                resolve(challenger)
            } else {
                reject(Error(FIREBASE_FAIL))
            }
        })
    });
}