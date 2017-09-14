import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { resetChallenge } from '../../actions';

import Timer from './Timer'
import * as firebase from '../../api/Firebase';
import * as facebook from '../../api/Facebook';
import * as event from '../../api/Event';

import contestImage from '../../image/contestImage.jpeg'
import contest2ring from '../../main_contest_big2rings.png'
import trophy from '../../contest_trophy.png'
import goldMedal from '../../1st_medal.png'

import commentTail from '../../comment_Tail.png'

import './Apply.css'

class Apply extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dday : null,
            targetUid : null
        }

        this.apply = this.apply.bind(this)
        this.onApplySuccess = this.onApplySuccess.bind(this)
    }

    componentDidMount() {
        const instance = this
        event.getDDay().then((dday) => {
            instance.setState({dday : dday})
        })
    }

    apply() {
        const instance = this
        const comment = document.getElementById('commentText').value

        if (!comment || comment == '') {return}
        if (!this.props.profile) {
            facebook.signInWithPopup()
            return
        }
        
        if (this.props.imageURL && this.props.similarity) {
            firebase.apply(this.props.profile, comment, this.props.imageURL, this.props.similarity).then(function(result) {
                // 성공시
                console.log(result);
                instance.onApplySuccess()
            }, function (error) {
                // 실패시 
                console.error(error);
            });
        }
    }

    onApplySuccess() {
        if(!this.props.profile || !this.props.profile.uid) {return}
        const uid = this.props.profile.uid
        this.setState({ targetUid : uid })
        this.props.onResetChallenge()
    }

    render() {
        if(this.state.targetUid) {
            const path = "challenger/" + this.state.targetUid
            return <Redirect to={path}/>;
        }

        if(!this.props.profile && !this.props.blob && !this.props.similarity) { 
            return <div></div> 
        }

        const profile = this.props.profile
        const imgSrc = URL.createObjectURL(this.props.blob)
        const similarity = this.props.similarity

        return (
            <div>
                <div className = "applyContestLabel">컨테스트 응모하기</div>
                <div className = "rewardLabel">컨테스트 우승자에게는 <br/>10만원 상당의 상금을 드립니다!</div>
                
                <div className="timerContainer"> 
                    <img src={trophy} className = "left cup"/>
                    <Timer
                        id='timerLeft'
                        text=''
                    />
                    <img src={trophy} className = "right cup"/>
                </div>

                
                <div className="contestBigContainer" >

                    <div className = "similarMedal">
                        <img src={goldMedal}/>
                        <p>닮</p>
                    </div>

                    <div className="contestImageContainer">
                        <img src={contest2ring}/>
                        <div className = "contestingImage">
                            <img src={contestImage}/>
                        </div>
                        <div className = "applyingImage">
                            <img src={imgSrc}/>
                        </div>
                    </div>
                    <p className = "similarText">그 분과 {similarity}% 닮은 꼴!</p>
                    <p className = "nicknameText">{profile.name} 님!</p>
                    
                    <div className = "commentPlzBox">
                        <textarea rows="3" cols="50" id='commentText' type="text" placeholder = "나를 어필하는 한마디를 써주세요"></textarea>
                    </div>

                    <div className = "contestApplyButton">
                        <button onClick={this.apply}>
                            콘테스트에 이대로 응모하기
                        </button>
                    </div>

                </div>

                

                
                {/* <div>그 분과 {similarity}% 닮은 꼴!</div> */}
                
                {/* <div>{profile.name} 님!</div> */}
                
                
                
                
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile : state.profile.profile,
        blob : state.challenge.cropImg,
        imageURL : state.challenge.imageURL,
        similarity : state.challenge.similarity
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onResetChallenge: () => dispatch(resetChallenge())
    }
}

Apply = connect(mapStateToProps, mapDispatchToProps)(Apply);

export default Apply;