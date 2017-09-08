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
            
        }, function(error) {

        })

        window.Kakao.Link.createDefaultButton({
            container: '#kakao-share-challenger',
            objectType: 'feed',
            content: {
              title: '피넛',
              description: '공유 테스트 입니당',
              imageUrl: 'http://img.ezmember.co.kr/cache/board/2013/03/18/85c137cf1df080c680d70e457e38f3ba.jpg',
              link: {
                mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
                webUrl: 'https://peanut-5b51b.firebaseapp.com/'
              }
            },
            social: {
              likeCount: 286,
              commentCount: 45,
              sharedCount: 845
            },
            buttons: [
              {
                title: '웹으로 보기',
                link: {
                  mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
                  webUrl: 'https://peanut-5b51b.firebaseapp.com/'
                }
              },
              {
                title: '앱으로 보기',
                link: {
                  mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
                  webUrl: 'https://peanut-5b51b.firebaseapp.com/'
                }
              }
            ]
        });
        //kakao.shareChallenger(window)
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
                    <p> 지인에게 공유해서 표 얻자 </p>
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