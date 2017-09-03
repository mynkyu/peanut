import React from 'react';
import { Link } from 'react-router-dom'

import contestImg from '../../contestImg.png'
import userOnImg from '../../userOnImg.png'

const Top = () => {
    return (
        <div> 
            <div>컨테스트 실시간 1위 D-</div>
            <div><Link to="/ranking">순위확인</Link></div>
            <div>
                <img src={contestImg}/>
                <img src={userOnImg}/>
                <div>1위 멘트</div>
            </div>
        </div>
    );
};

export default Top;