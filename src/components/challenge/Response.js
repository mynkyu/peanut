import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as facebook from '../../api/Facebook';
import * as facelink from '../../api/FaceLink';

import './Response.css';

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
                <div className='responseDiv'>
                    <p id='responseText' >{response}</p>
                    <div className='successButton'>
                        <button className='successButtonLabel' onClick={this.facebookLogin}>
                            페이스북 로그인
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <div className='responseDiv'>
                <p id='responseText'>{response}</p>
                <div className='failButton'>
                    <Link className='failButtonLabel' to="/challenge">
                        <p>사진 선택으로 되돌아 가기</p>
                    </Link>
                </div>
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