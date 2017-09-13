import React from 'react';
import * as firebase from 'firebase'

import * as kakao from '../api/Kakao';
import * as facebook from '../api/Facebook';
import * as firebaseApi from '../api/Firebase';

import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import '../Header.css'
import './Profile.css'

import userOffImg from '../userOffImg.png'

class Profile extends React.Component {

  componentDidMount(){
    kakao.init()
    facebook.init();
    this.initFirebaseAuth();    
  }

  initFirebaseAuth() {
    
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
        
      } else {
        console.log("signOut")
        this.props.onSignOut()
      }
    });
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
      const path = "/mypage/" + profile.uid
      item = <Link to={path}> <img id="profile_img" className = "afterLogin"  src={profile.photoURL} alt='' style = {{height : '2rem' , mode : 'fit'}} /> </Link>
    } else {
      item = <img id="profile_img" className = "beforeLogin"  src={userOffImg} onClick={this.facebookLogin} alt='' style = {{ height : '2rem', mode : 'fit'}}  />
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