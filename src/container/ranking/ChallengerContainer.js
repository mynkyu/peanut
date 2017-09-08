import React, { Component } from 'react';

import Challenger from '../../components/ranking/Challenger'
import * as kakao from '../../api/Kakao';
import * as facebook from '../../api/Facebook';
import * as firebase from '../../api/Firebase';

class ChallengerContainer extends Component {
    constructor() {
        super()
        this.state = {
            challenger : null
        }

        this.facebookShare = this.facebookShare.bind(this)
    }

    componentDidMount() {
        const instance = this
        const uid = this.props.match.params.uid
        
        firebase.getChallenger(uid).then(function(challenger){
            instance.setState({
                challenger : challenger
            })
            kakao.shareChallenger()
        }, function(error) {
        })
    }

    vote() {
        
    }

    facebookShare() {
        if (!this.state.challenger) { return }
        const uid = this.state.challenger.uid
        facebook.shareChallenger(uid)
    }

    render() {
        const challenger = this.state.challenger
        if (!challenger) {return <div></div>}
        
        return (
            <div>
                <div>
                    <Challenger
                        challenger = {challenger}
                    />
                </div>
                <div>
                    <button onClick={this.vote}>투표하기</button>
                    <a id="kakao-share-challenger" href="javascript:sendLink()">
                        <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
                    </a>
                    <button onClick={this.facebookShare}>페이스북 공유</button>
                </div>
            </div>
        );
    }
}

export default ChallengerContainer;