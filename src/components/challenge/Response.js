import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as facebook from '../../api/Facebook';
import * as facelink from '../../api/FaceLink';

class Response extends Component {
    facebookLogin() {
        facebook.signInWithPopup()
    }

    render() {
        const profile = this.props.profile
        const response = facelink.getResponse(parseInt(this.props.match.params.response))

        if (this.props.match.params.response == 200) {
            if(profile) {
                return <Redirect to="/challenge/result"/>
            }

            return (
                <div>
                    <div><p>{response}</p></div>
                    <div><button onClick={this.facebookLogin}>페이스북 로그인</button></div>
                    {/* <div><Link to="/challenge/result">로그인</Link></div> */}
                </div>
            );
        } 
        
        return (
            <div>
                <div>에드센스</div>
                <div>에드센스</div>
                <div>에드센스</div>
                <div>에드센스</div>
                <div><p>{response}</p></div>
                <div><Link to="/challenge">사진 선택으로 되돌아 가기</Link></div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile
    };
}

Response = connect(mapStateToProps)(Response);

export default Response;