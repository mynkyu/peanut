import React from 'react';

import imgContainer from '../../main_contest_ring.png'
import './Top.css';

const TopItem = ({challenger}) => {
    if (!challenger) {
        return <div></div>
    }

    return (
        <div className = "imgContainer firstContainer">
            <img src = {imgContainer}/>
            <div className = "firstPrize">
                <img src = {challenger.imageURL}/>
            </div>
            <p>{challenger.vote} 표</p>
        </div>
    );
};

export default TopItem;