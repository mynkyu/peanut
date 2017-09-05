import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetChallenge } from '../../actions';

import * as firebase from '../../api/Firebase';
import * as facebook from '../../api/Facebook';
import * as event from '../../api/Event';

import contestImg from '../../contestImg.png'

class Apply extends Component {
    constructor(props) {
        super(props)

        this.apply = this.apply.bind(this)
    }

    apply() {
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
            }, function (error) {
                // 실패시 
                console.error(error);
            });
        }
    }

    onApplySuccess() {
        this.props.onResetChallenge()
    }

    render() {
        if(!this.props.profile && !this.props.blob && !this.props.similarity) { 
            return <div></div> 
        }

        const profile = this.props.profile
        const imgSrc = URL.createObjectURL(this.props.blob)
        const dday = event.getDDay()
        const similarity = this.props.similarity

        return (
            <div>
                <div>컨테스트 응모하기</div>
                <div>컨테스트 우승자에게는 10만원 상당의 상금을 드립니다!</div>
                <div>D-{dday}</div>
                <div>
                    <img src={contestImg}/>
                    <img src={imgSrc}/>
                </div>
                <div>그 분과 {similarity}% 닮은 꼴!</div>
                <div>{profile.name} 님!</div>
                <div>
                    <input id='commentText' type="text"></input>
                </div>
                <div>나를 어필하는 한마디를 써주세요!</div>
                <div>
                    <button onClick={this.apply}>
                        콘테스트 응모하기
                    </button>
                </div>
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

Apply = connect(mapStateToProps)(Apply);

export default Apply;