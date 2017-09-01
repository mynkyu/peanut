import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Croppie from 'croppie'
import croppieStyle from 'croppie/croppie.css'

import facebook from './facebook.png'

class Firebase extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

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
    */

    function uploadFB(blob) {
      var file = blob;

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
      )
    }

    var uploader = document.getElementById('uploader')
    var fileButton = document.getElementById('fileButton')

    function upload(imageUrl) {
      var el = document.getElementById('upload');
      var upload = new Croppie(el, {
        viewport: { width: 100, height: 100 },
        boundary: { width: 300, height: 300 },
        showZoomer: true,
        enableOrientation: true,
        enableExif: true
      });
      upload.bind({
        url: imageUrl,
      });

      document.getElementById('uploadBtn').addEventListener('click', function(ev) {
        upload.result('blob').then(function(blob) {
          uploadFB(blob)
        });
      })
    }

    fileButton.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          upload(e2.target.result)
        }

        reader.readAsDataURL(e.target.files[0]);
      }
      else {
        console.log("upload fail")
      }
    })
  }

  render(){
    return (
      <div>
        <div id="upload" className="croppie-container"/>
        <progress value ="0" max="100" id="uploader">0%</progress>
        <input type="file" value="upload" id="fileButton"/>
        <button id="uploadBtn"> 업로드버튼 </button>
      </div>
    );
  }
}

export default Firebase;
