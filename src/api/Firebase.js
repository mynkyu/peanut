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

        
        event.getEventInfo().then((eventInfo) => {
            const eventName = event.getEventName()
            //firebase.database().ref().child('challenger').child(eventName).push({
            firebase.database().ref().child('challenger').child(eventName).child(profile.uid).set({
                uid : profile.uid,
                name : profile.name,
                facebookURL : profile.facebookURL,
                imageURL : imageURL,
                similarity : similarity,
                comment : comment,
                time : eventInfo.data.currTime,
                vote : 0
            }, onComplete)
        })
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
        time : data.time,
        rank : rank
    }
}

export var getRanking = function () {
    return new Promise(function (resolve, reject) {
        const eventName = event.getEventName()
        firebase.database().ref().child('challenger').child(eventName)
        .orderByChild('vote').once('value').then(function(snapshot){
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

export var getVote = function (challengerId, uid) {
    return new Promise(function (resolve, reject) {
        const eventName = event.getEventName()
        firebase.database().ref().child('vote').child(eventName).child(challengerId).child(uid).once('value').then(function(snapshot){
            if (snapshot.exists()) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    });
}

export var vote = function (challengerId, uid) {
    const eventName = event.getEventName()
    firebase.database().ref().child('vote').child(eventName).child(challengerId).child(uid).set("false")
}

export var getChallengerFeed = function (time) {
    return new Promise(function (resolve, reject) {
        const eventName = event.getEventName()
        var query = firebase.database().ref().child('challenger').child(eventName).orderByChild('time')

        if(time) {
            query = query.endAt(time)
        }
        query.limitToLast(20).once('value').then(function(snapshot){
            if (snapshot.exists()) {

                var feed = []
                var challengers = []
                snapshot.forEach(function(childSnapshot){
                    const data = childSnapshot.val()
                    challengers.push(data)
                })

                const length = challengers.length
                for (var i = length; i > 0; i--) {
                    feed.push(parseChallenger(challengers[i-1], 0))
                }
                
                resolve(feed)
            } else {
                resolve(null)
            }
        })
    });
}