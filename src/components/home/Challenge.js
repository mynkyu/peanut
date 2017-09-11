import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import * as event from '../../api/Event';

import contestImage from '../../image/contestImage.jpeg'
import contestRing from '../../main_contest_ring.png'
import './Challenge.css';


class Challenge extends Component {
    render() {
        return (
            <div className = "challengeDiv">
                <p className = "contestLabel">컨테스트</p> 
                <div className = "separator"></div>
                <p className = "firstContext">이 주의 '그 분'에게 도전하기</p>
                <p className = "secondContext">{event.getEventWeek()}는 바로 이분!</p>
                
                <div className = "ringImage" ><img  src={contestRing}/>
                    <div className = "personForChallenge"><img src={contestImage}/></div>
                </div>
                
                <div className = "startLink" >
                    <Link to="/challenge" className = "startLinkLabel">시작하기</Link>
                </div>
                
            </div>
        );
    }
}

export default Challenge;