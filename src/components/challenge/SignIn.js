import React, { Component } from 'react';

class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            profile : null
        }
    }

    componentDidMount() {
        
    }    

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');
        provider.addScope('user_friends');
    
        firebase.auth().signInWithRedirect(provider);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default SignIn;