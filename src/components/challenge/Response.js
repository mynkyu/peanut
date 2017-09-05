import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as facebook from '../../api/Facebook';
import * as facelink from '../../api/FaceLink';

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
        const response = facelink.getResponse(parseInt(this.props.match.params.response))
        document.getElementById('response').innerText = response
    }

    facebookLogin() {
        facebook.signInWithPopup()
    }

    render() {
        if (this.props.match.params.response == 200) {
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
        profile: state.profile.profile
    };
}

Response = connect(mapStateToProps)(Response);

export default Response;