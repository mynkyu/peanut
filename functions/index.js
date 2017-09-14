const functions = require('firebase-functions');
const axios = require('axios');
const querystring = require ('querystring');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const dueDate = new Date("2017-09-17T24:00:00");
const appURL = "https://peanutstud.io/"

exports.getEventInfo = functions.https.onRequest((req, res) => {
    const date = new Date()
    const dueTime = dueDate.getTime()
    const currTime = date.getTime()
    cors(req, res, () => {
      res.status(200).send({
        dueTime : dueTime,
        currTime : currTime
      });
    });
});
  
exports.ranking = functions.https.onRequest((req, res) => {
    var uid = 'root'
    if (req.params.length == 1) {
      uid = req.params[0]
    } else if (req.params.length == 2){
      uid = req.params[1]
    }
  
    const path = appURL +'?'+ querystring.stringify({ranking : uid})
    res.redirect(303, path);
});
  
exports.challenge = functions.https.onRequest((req, res) => {
    const path = appURL +'?'+ querystring.stringify({challenge : 'root'})
    res.redirect(303, path);
});
  
exports.mypage = functions.https.onRequest((req, res) => {
    console.log(req.params)
  
    var uid = 'root'
    if (req.params.length == 1) {
      uid = req.params[0]
    }
    const path = appURL +'?'+ querystring.stringify({mypage : uid})
    res.redirect(303, path);
});
  
exports.feed = functions.https.onRequest((req, res) => {
    console.log(req.params)
    
    var uid = 'root'
    if (req.params.length == 1) {
      uid = req.params[0]
    }
    const path = appURL +'?'+ querystring.stringify({feed : uid})
    res.redirect(303, path);
});
  
exports.calSimilarity = functions.https.onRequest((req, res) => {
    if (req.method === 'PUT') {
      cors(req, res, () => {
        res.status(403).send('Forbidden!');
      });
    }

    const eventName = req.query.eventName
    if (eventName) {
      const path = '/event/' + eventName
      admin.database().ref(path).transaction(function(event) {
        if(event) {
          if(event.challengeCount) {
            event.challengeCount++
          } else {
            event['challengeCount'] = 1
          }
        } else {
          event = {challengeCount : 1}
        }
        return event
      })
    }

    cors(req, res, () => {
      const imageUri = req.query.imageUri;
      axios.get('http://35.200.119.61:8080/contest/similar?' + querystring.stringify({imageUri : imageUri})).then(function (response) {
        res.status(200).send(response.data);
      })
      .catch(function (error) {
      });
    });
});
  
exports.apply = functions.database.ref('/challenger/{eventName}/{challengerId}').onWrite(event => {
    const prev = event.data.previous
    const curr = event.data
  
    if (!prev.exists() && curr.exists()) {
      const eventName = event.params.eventName
      const eventRef = event.data.ref.root.child('event').child(eventName)
      eventRef.transaction(function(event) {
        if(event) {
          if(event.applyCount) {
            event.applyCount++
          } else {
            event['applyCount'] = 1
          }
        } else {
          event = {applyCount : 1}
        }
        return event
      });
    }

    if (prev.exists() && 
      !(curr.exists() && (prev.val().imageURL == curr.val().imageURL))) {
      const eventName = event.params.eventName
      const challengerId = event.params.challengerId
      const prevRef = event.data.ref.root.child('removed_challenger').child(eventName).child(challengerId)
      const voteRef = event.data.ref.root.child('vote').child(eventName).child(challengerId)

      return prevRef.push(event.data.previous.val()).then(() => {
        return voteRef.set(null)
      });
    }
  });
  
exports.vote = functions.database.ref('/vote/{eventName}/{challengerId}/{uid}').onWrite(event => {
    if (event.data.exists() && !event.data.previous.exists()) {
      const eventName = event.params.eventName
      const challengerId = event.params.challengerId
      const uid = event.params.uid
      const challengerRef = event.data.ref.root.child('challenger').child(eventName).child(challengerId)
  
      return challengerRef.transaction(function(challenger) {
        if(challenger) {
          challenger.vote++
        }
        return challenger;
      });
    }
});