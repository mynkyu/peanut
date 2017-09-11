import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Challenger from '../../components/ranking/Challenger'
import VoteButton from '../../components/ranking/VoteButton'

import * as kakao from '../../api/Kakao';
import * as facebook from '../../api/Facebook';
import * as firebase from '../../api/Firebase';

class ChallengerContainer extends Component {
    constructor() {
        super()
        this.state = {
            isNonExist : null,
            isVote : null,
            challenger : null
        }

        this.facebookShare = this.facebookShare.bind(this)
        this.vote = this.vote.bind(this)
    }

    componentWillReceiveProps(props) {
        const instance = this
        const profile = props.profile
        const challengerId = props.match.params.uid

        firebase.getChallenger(challengerId).then(function(challenger){
            instance.setState({ challenger : challenger })
            kakao.shareChallenger(challenger)
        }, function(error) {
            instance.setState({ isNonExist : true })
        })

        if (profile) {
            firebase.getVote(challengerId, profile.uid).then(function(isVote){
                instance.setState({ isVote : isVote })
            }, function(error) {
            })
        } else {
            instance.setState({ isVote : null })
        }
    }

    componentDidMount() {
        const instance = this
        const profile = this.props.profile
        const challengerId = this.props.match.params.uid

        firebase.getChallenger(challengerId).then(function(challenger){
            instance.setState({ challenger : challenger })
            kakao.shareChallenger(challenger)
        }, function(error) {
            instance.setState({ isNonExist : true })
        })

        if (profile) {
            firebase.getVote(challengerId, profile.uid).then(function(isVote){
                instance.setState({ isVote : isVote })
            }, function(error) {
            })
        }
    }

    facebookShare() {
        const profile = this.props.profile
        const challenger = this.state.challenger

        if (!profile) {
            facebook.signInWithPopup()
            return
        }

        if(!challenger) {
            return
        }
        
        facebook.shareChallenger(challenger.uid)
    }

    vote() {
        const isVote = this.state.isVote
        const profile = this.props.profile
        const challenger = this.state.challenger

        if (isVote) {
            return
        }

        if (!profile) {
            facebook.signInWithPopup()
            return
        }

        if(!challenger) {
            return
        }
        console.log('vote')
        firebase.vote(challenger.uid, profile.uid)
        this.setState({ isVote : true })
    }

    render() {
        if(this.state.isNonExist) {
            return <Redirect to='/challenge'/>
        }
        return (
            <div>
                <div>
                    <Challenger challenger = {this.state.challenger} />
                </div>
                <div>
                    <button onClick={this.vote}>
                        <VoteButton isVote = {this.state.isVote}/>
                    </button>
                </div>
                <div>
                    <a id="kakao-share-challenger" href="javascript:sendLink()">
                        <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
                    </a>
                    <button onClick={this.facebookShare}>페이스북 공유</button>
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

ChallengerContainer = connect(mapStateToProps)(ChallengerContainer);

export default ChallengerContainer;