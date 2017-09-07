import React from 'react';
import * as firebase from 'firebase'

import * as kakao from '../api/Kakao';
import * as facebook from '../api/Facebook';
import * as firebaseApi from '../api/Firebase';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import '../Header.css'
import './Profile.css'

import userOnImg from '../userOnImg.png'
import userOffImg from '../userOffImg.png'

class Profile extends React.Component {

  componentDidMount(){
    kakao.init(window);
    facebook.init(window);
    this.initFirebaseAuth();
  }

  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  initFirebaseAuth() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // const displayName = user.displayName;
        // const email = user.email;
        // const emailVerified = user.emailVerified;
        // const photoURL = user.photoURL;
        // const isAnonymous = user.isAnonymous;
        // const uid = user.uid;
        // const providerData = user.providerData;
        // [START_EXCLUDE]
        console.log("signIn")
        const profile = firebaseApi.updateProfile(user)
        this.props.onSignIn(profile)
        //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        console.log("signOut")
        this.props.onSignOut()
        // User is signed out.
        // [START_EXCLUDE]
        //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        //document.getElementById('quickstart-account-details').textContent = 'null';
        // [END_EXCLUDE]
      }
    });
    // [END authstatelistener]
  }

  facebookLogin() {
    facebook.signInWithRedirect()
  }

  facebookLogout() {
    firebase.auth().signOut()
  }

  render(){
    const profile = this.props.profile
    var item = null
    if (profile) {
      item = <img id="profile_img" className = "afterLogin"  src={profile.photoURL} onClick={this.facebookLogout} style = {{height : 50, mode : 'fit'}} />
      {/* <button onClick={this.facebookShare}> 공유 </button> */}
    } else {
      item = <img id="profile_img" className = "beforeLogin"  src={userOffImg} onClick={this.facebookLogin} style = {{height : 50, mode : 'fit'}}  />
    }

    return (
      <div  className="item profile">
        {item}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
      profile : state.profile.profile
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSignIn: (profile) => dispatch(signIn(profile)),
      onSignOut: () => dispatch(signOut())
  }
}

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;