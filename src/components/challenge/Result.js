import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as kakao from '../../api/Kakao';
import * as facebook from '../../api/Facebook';

import contestImage from '../../image/contestImage.jpeg'

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
                <div>
                    <img src={contestImage}/>
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