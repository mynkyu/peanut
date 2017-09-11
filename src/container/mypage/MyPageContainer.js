import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'

class MyPageContainer extends Component {
    signOut() {
        firebase.auth().signOut()
    }

    render() {
        const profile = this.props.profile
        if(!profile) {
            return <Redirect to='/home'/>
        }

        const path = '/ranking/challenger/' + this.props.uid

        return (
            <div>
                <div>여백</div>
                <div>여백</div>
                <div>여백</div>
                <div>여백</div>
                <div>여백</div>
                <Link to={path}><div>내가 지원한 콘테스트</div></Link>
                <button onClick={this.signOut}><div>로그아웃</div></button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile : state.profile.profile
    };
}

MyPageContainer = connect(mapStateToProps)(MyPageContainer);
export default MyPageContainer;