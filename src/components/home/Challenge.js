import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import * as event from '../../api/Event';

import contestImage from '../../image/contestImage.jpeg'
import contestRing from '../../main_contest_ring.png'
import './Challenge.css';


class Challenge extends Component {
    constructor() {
        super()
        this.state = {
            isContestOn : null
        }
    }

    componentDidMount() {
        const self = this
        event.getEventInfo().then((info) => {
            const dueTime = info.data.dueTime
            const currTime = info.data.currTime

            if (dueTime < currTime) {
                self.setState({isContestOn:false})
            } else {
                self.setState({isContestOn:true})
            }
        })
    }

    render() {
        const isContestOn = this.state.isContestOn

        var start = <div className = "startLink" > <div className = "startLinkLabel">시작하기</div> </div>;
        
        if(isContestOn != null) {
            if(isContestOn) {
                start = <div className = "startLink" ><Link to="/challenge" className = "startLinkLabel">시작하기</Link></div>
            } else {
                start = <div className = "startLink" > <div className = "startLinkLabel">컨테스트 종료</div> </div>
            }
        }

        return (
            <div className = "challengeDiv">
                <p className = "contestLabel">컨테스트</p> 
                <div className = "separator"></div>
                <p className = "firstContext">이 주의 '그 분'에게 도전하기</p>
                <p className = "secondContext">{event.getEventWeek()}는 바로 이분!</p>
                
                <div className = "ringImage" ><img  src={contestRing}/>
                    <div className = "personForChallenge"><img src={contestImage}/></div>
                </div>
                {start}
            </div>
        );
    }
}

export default Challenge;