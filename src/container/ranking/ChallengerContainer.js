import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Challenger from '../../components/ranking/Challenger'
import VoteButton from '../../components/ranking/VoteButton'

import * as kakao from '../../api/Kakao';
import * as facebook from '../../api/Facebook';
import * as firebase from '../../api/Firebase';

import kakaoIcon from '../../kakao_icon.png'
import facebookIcon from '../../facebook_icon.png'

import './ChallengerContainer.css'

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
        
        facebook.shareChallenger(challenger)
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
            <div className="challengerInfoContainer">
                <div>
                    <Challenger challenger = {this.state.challenger} />
                </div>

                <div className = "voteButton">
                    <button onClick={this.vote} >
                        <VoteButton isVote = {this.state.isVote}/>
                    </button>
                </div>
                
                <div className="kakaoShare">
                    <a id="kakao-share-challenger" href="javascript:sendLink()">
                        <img src={kakaoIcon}/>
                        <p>에 공유하기</p>
                    </a>
                </div>

                <div className="facebookShare">
                    <button onClick={this.facebookShare}>
                        <img src={facebookIcon}/>
                        <p>에 공유하기</p>
                    </button>
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