import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import contestImg from '../../contestImg.png'

class Challenge extends Component {
    render() {
        return (
            <div>
                <div>
                    <h4>컨테스트</h4>
                    <h4>이 주의 '그 분'에게 도전하기</h4>
                    <h4>월의 주차는 바로 이분!</h4>
                </div>
                <div><img src={contestImg}/></div>
                <div><Link to="/challenge">시작하기</Link></div>
            </div>
        );
    }
}

export default Challenge;