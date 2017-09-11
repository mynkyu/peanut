import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'

import './MyPage.css'

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
            <div className='mypageDiv'>
                <div className='contestButton'>
                    <Link className='contestButtonLabel' to={path}>
                        내가 지원한 콘테스트
                    </Link>
                </div>
                <div className='signOutButton'>
                    <button className='signOutButtonLabel' onClick={this.signOut}>
                        로그아웃
                    </button>
                </div>
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