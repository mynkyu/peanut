import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as event from '../../api/Event';

import contestImg from '../../contestImg.png'

class Apply extends Component {
    render() {
        if(!this.props.blob) { return <div></div> } 
        const imgSrc = URL.createObjectURL(this.props.blob)
        const dday = event.getDDay()

        return (
            <div>
                <div>컨테스트 응모하기</div>
                <div>컨테스트 우승자에게는 10만원 상당의 상금을 드립니다!</div>
                <div>D-{dday}</div>
                <div>
                    <img src={contestImg}/>
                    <img src={imgSrc}/>
                </div>
                <div>그 분과 97% 닮은 꼴!</div>
                <div>박나래 님!</div>
                <div>"나를 어필하는 한마디를 써주세요!"</div>
                <div>콘테스트 응모하기</div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        blob: state.crop.cropImg
    };
}

Apply = connect(mapStateToProps)(Apply);

export default Apply;