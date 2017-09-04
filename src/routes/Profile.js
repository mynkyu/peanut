import React from 'react';
import * as firebase from 'firebase'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import '../Header.css'

import userOnImg from '../userOnImg.png'
import userOffImg from '../userOffImg.png'

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userOn : false
    }

    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount(){
    this.initFacebookSDK();
    this.initFirebaseAuth();
  }

  initFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '114048632608756',
        xfbml      : true,
        version    : 'v2.10'
      });
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
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
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        // [START_EXCLUDE]
        console.log("signIn")
        this.updateUser(true)
        this.props.onSignIn(user)
        //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        console.log("signOut")
        this.updateUser(false)
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

  updateUser(userOn){
    this.setState({
      userOn : userOn
    })
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithRedirect(provider);
  }

  facebookShare() {
    window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object:'https://developers.facebook.com/docs/',
      })
    }, response => {});
  }

  render(){
    let profile = null

    if (this.state.userOn) {
      profile = <img id="profile_img" src={userOnImg}/>
      {/* <button onClick={this.facebookShare}> 공유 </button> */}
    } else {
      profile = <img id="profile_img" src={userOffImg} onClick={this.facebookLogin} />
    }

    return (
      <div  className="item profile">
        {profile}
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSignIn: (profile) => dispatch(signIn(profile)),
      onSignOut: () => dispatch(signOut())
  }
}

Profile = connect(undefined, mapDispatchToProps)(Profile);

export default Profile;
