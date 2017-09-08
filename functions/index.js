const functions = require('firebase-functions');
const axios = require('axios');
const querystring = require ('querystring');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.calSimilarity = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
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