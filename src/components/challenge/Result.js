import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as kakao from '../../api/Kakao';
import * as facebook from '../../api/Facebook';

import contestImage from '../../image/contestImage.jpeg'
import contest2ring from '../../main_contest_big2rings.png'
import './Result.css'

import kakaoIcon from '../../kakao_icon.png'
import facebookIcon from '../../facebook_icon.png'
import seeContestImage from '../../main_contest_heart_icon.png'


class Result extends Component {
    componentDidMount() {
        kakao.sharePeanut()
    }

    facebookShare() {
        facebook.sharePeanut()
    }

    render() {
        if(!this.props.blob && !this.props.similarity) { return <div></div> } 
        const imgSrc = URL.createObjectURL(this.props.blob)
        const similarity = this.props.similarity
        
        return (
            <div>
                <div className = "contestResultImageContainer">
                    <img src={contest2ring}/>
                    <div className = "contestResultImage">
                        <img src={contestImage}/>
                    </div>
                    <div className="contestResultMyImage">
                        <img src={contestImage}/>
                    </div>
                </div>
                <p className = "similarityLabel">이 분과 당신의 일치율은...</p>
                <p className="similarity">{similarity}%</p>
                <p className = "scaryText">이쯤되면 무서운데요?</p>
                <div className="contestGo"><Link to="/challenge/apply">컨테스트 응모 자격 획득!</Link></div>
                <div className="buttons">
                    <Link to="/challenge" className="againwithAnother">다른 사진으로 재도전</Link>
                    
                    <button onClick={this.facebookShare} className="shareOnFacebook">
                        <img src={facebookIcon}/>
                        <p>공유</p>
                    </button>

                    <a id="kakao-link-btn" href="javascript:sendLink()" className="shareOnKakao">
                        <img src={kakaoIcon}/>
                        <p>공유</p>
                    </a>
                </div>
                <div className="seeContest"> 
                    <p>컨테스트 구경하러 가기</p>
                    <div>
                        <img src={seeContestImage}/>
                        <Link to="/ranking">실시간 투표 상황</Link>
                    </div>
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