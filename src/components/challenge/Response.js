import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase'

class Response extends Component {
    constructor() {
        super()
        this.state = {
            profile : null
        }
    }

    componentWillReceiveProps(props) {
        if (props.profile) {
            this.setState({
                profile : props.profile 
            })
        }
    }

    componentDidMount() {
         const response = this.props.match.params.response
         document.getElementById('response').innerText = response
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');
        provider.addScope('user_friends');
    
        firebase.auth().signInWithPopup(provider);
        //firebase.auth().signInWithRedirect(provider);
    }

    render() {
        if (this.props.match.params.response == 100) {
            if(this.state.profile) {
                return <Redirect to="/challenge/result"/>
            }

            return (
                <div>
                    <div><a id='response'></a></div>
                    <div><button onClick={this.facebookLogin}>페이스북 로그인</button></div>
                    {/* <div><Link to="/challenge/result">로그인</Link></div> */}
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