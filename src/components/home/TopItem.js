import React from 'react';
import { Link } from 'react-router-dom'

import imgContainer from '../../main_contest_ring.png'
import './Top.css';

import medal1 from '../../1st_medal.png'
import medal2 from '../../2nd_medal.png'
import medal3 from '../../3rd_medal.png'

const TopItem = ({challenger}) => {
    if (!challenger) {
        return <div></div>
    }

    const path = "/ranking/challenger/" + challenger.uid
    
    var medalImg = medal3
    switch (challenger.rank) {
        case 1: medalImg = medal1; break;
        case 2: medalImg = medal2; break;
        case 3: medalImg = medal3; break;
        default:
            break;
    }

    return (
        <div className = "imgContainer firstContainer">
            <Link to={path}>
                <img src = {imgContainer}/>
                <div className = "firstPrize">
                    <img src = {challenger.imageURL}/>
                </div>
                <p>{challenger.vote} 표</p>
            </Link>

            <div className="rankingMedal">
                <img src = {medalImg}/>
                <p>{challenger.rank}<span className = "suffix">위</span></p>
            </div>    

        </div>
    );
};

export default TopItem;