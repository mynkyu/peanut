import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import contestImg from '../../contestImg.png'

class Result extends Component {
    /*
    constructor(props) {
        super(props)
        this.state = {
            cropImg : null
        }
    }

    componentWillReceiveProps(props) {
        if (props.profile) {
            this.setState({
                profile : props.profile 
            })
        }
    }
    */

    componentDidMount() {
        window.Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
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
    }

    facebookShare() {
        window.FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object:'https://developers.facebook.com/docs/',
            })
        }, response => {});
    }

    render() {
        if(!this.props.blob && !this.props.similarity) { return <div></div> } 
        const imgSrc = URL.createObjectURL(this.props.blob)
        const similarity = this.props.similarity
        
        return (
            <div>
                <div>
                    <img src={contestImg}/>
                    <img src={imgSrc}/>
                </div>
                <div>이 분과 당신의 일치율은...</div>
                <div>{similarity}%</div>
                <div>이쯤되면 무서운데요?</div>
                <div><Link to="/challenge/apply">컨테스트 응모 자격 획득!</Link></div>
                <div>
                    <Link to="/challenge">다른 사진으로 재도전</Link>
                    <button onClick={this.facebookShare}>페이스북 공유</button>
                    <a id="kakao-link-btn" href="javascript:sendLink()">
                    <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/></a>
                </div>
                <div> 
                    <div>컨테스트 구경하러 가기</div>
                    <div><Link to="/ranking">실시간 투표 상황</Link></div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        blob : state.challenge.cropImg,
        similarity : state.challenge.similarity
    };
}

Result = connect(mapStateToProps)(Result);

export default Result;