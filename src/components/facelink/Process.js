import React from 'react';
import './Process.css'

import colorline from '../../ing_line_for_export.png'

const Process = ({face}) => {
    return (
        <div className="loadingContainer">
            <img  className = "colorLine" src = {colorline} />

            <p className="processText">{face[0].name}님과 {face[1].name}님의</p>
            <br/>
            <p className="processText">일치율 계산 중...</p>
        </div>
    );
};

export default Process;