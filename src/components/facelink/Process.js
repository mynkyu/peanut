import React from 'react';
import './Process.css'

import colorline from '../../ing_line_for_export.png'

const Process = () => {
    return (
        <div className="loadingContainer">
            <img  className = "colorLine" src = {colorline} />

            <p className="processText">땅콩과 강낭콩의</p>
            <br/>
            <p className="processText">일치율 계산 중...</p>
        </div>
    );
};

export default Process;