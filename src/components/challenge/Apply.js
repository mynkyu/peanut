import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { resetChallenge } from '../../actions';

import Timer from './Timer'
import * as firebase from '../../api/Firebase';
import * as facebook from '../../api/Facebook';
import * as event from '../../api/Event';

import contestImage from '../../image/contestImage.jpeg'

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
                <div>컨테스트 응모하기</div>
                <div>컨테스트 우승자에게는 10만원 상당의 상금을 드립니다!</div>
                <div>D-{this.state.dday}</div>
                <div>
                    <img src={contestImage}/>
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
                <Timer/>
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