import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase';

class Response extends Component {
    constructor() {
        super()
        this.state = {
            profile : null
        }
    }

    componentDidMount() {
         const response = this.props.match.params.response
         document.getElementById('response').innerText = response
    }

    componentWillReceiveProps(props) {
        if (props.profile) {
            this.setState({
                profile : props.profile 
            })
        }
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');
        provider.addScope('user_friends');
    
        firebase.auth().signInWithRedirect(provider);
    }

    render() {
        if (this.props.match.params.response == 100 && this.props.profile) {
            return <Redirect push to='challenge/result'/>;
        } 

        if (this.props.match.params.response == 100) {
            return (
                <div>
                    <div><a id='response'></a></div>
                    <div>로그인</div>
                </div>
            );
        } 
        
        return (
            <div>
                <div><a id='response'></a></div>
                <div><Link to="/challenge">사진 선택으로 되돌아 가기</Link></div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
    };
}

Response = connect(mapStateToProps)(Response);

export default Response;