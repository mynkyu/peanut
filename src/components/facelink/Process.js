import React from 'react';
import './Process.css'

import colorline from '../../ing_line_for_export.png'

const Process = ({face}) => {
    return (
        <div className="loadingContainer">
            <img  className = "colorLine" src = {colorline} />

            <p className="processText">세계 최고의 머신러닝 기술로</p>
            <br/>
            <p className="processText">일치율을 계산중입니다</p>
        </div>
    );
};

export default Process;