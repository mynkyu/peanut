const functions = require('firebase-functions');
const axios = require('axios');
const querystring = require ('querystring');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const dueDate = new Date("2017-09-30T24:00:00");

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

exports.calSimilarity = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    cors(req, res, () => {
      res.status(403).send('Forbidden!');
    });
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
  if (event.data.previous.exists()) {
    const eventName = event.params.eventName
    const challengerId = event.params.challengerId
    const prevRef = event.data.ref.root.child('removed_challenger').child(eventName).child(challengerId)
    const voteRef = event.data.ref.root.child('vote').child(eventName).child(challengerId)
    return prevRef.push(event.data.previous.val()).then(() => {
      return voteRef.set(null)
    });
  }
});

exports.vote = functions.database.ref('/vote/{eventName}/{challengerId}').onWrite(event => {
  if (event.data.exists() && !event.data.previous.exists()) {
    const eventName = event.params.eventName
    const challengerId = event.params.challengerId
    const uid = event.params.uid
    const countRef = event.data.ref.root.child('challenger').child(eventName).child(challengerId).child('vote')

    return countRef.transaction(function(current) {
      return (current || 0) + 1;
    });
  }
});