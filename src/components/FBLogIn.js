import React from 'react';
import * as firebase from 'firebase'

class FBLogIn extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("componentDidMount");
    /*
    const preObject = document.getElementById('object');
    const dbRefObject = firebase.database().ref().child('object');
    dbRefObject.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    const ulList = document.getElementById('list')
    const dbRefList = dbRefObject.child('hobbies');
    dbRefList.on('child_added', snap => {
      const li = document.createElement('li');
      li.innerText = snap.val();
      li.id = snap.key;
      ulList.appendChild(li);
    });

    dbRefList.on('child_changed', snap => {
      const liChanged = document.getElementById(snap.key);
      liChanged.innerText = snap.val();
    })

    dbRefList.on('child_removed', snap => {
      const liRemove = document.getElementById(snap.key);
      liRemove.remove();
    })
    */

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
      const email = txtEmail.value;
      const password = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e => {
      const email = txtEmail.value;
      const password = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
      }
    });

    var uploader = document.getElementById('uploader')
    var fileButton = document.getElementById('fileButton')
    console.log("h")

    fileButton.addEventListener('change', function(e) {
      var file = e.target.files[0];

      var storageRef = firebase.storage().ref('test/' + file.name)
      var task = storageRef.put(file)
      task.on('state_changed',
        function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100
          uploader.value = percentage
        },
        function error(err) {

        },
        function complete() {

        }
      );
    })

    var bigOne = document.getElementById('bigOne')
    var dbRef = firebase.database().ref().child('text');
    dbRef.on('value', snap => bigOne.innerText = snap.val());
  }

  render(){
    return (
      <h1></h1>
    );
  }
}

export default FBLogIn;
