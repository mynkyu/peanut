import React from 'react';
import { Link } from 'react-router-dom'

import imgContainer from '../../main_contest_ring.png'
import './Top.css';

const TopItem = ({challenger}) => {
    if (!challenger) {
        return <div></div>
    }

    const path = "/ranking/challenger/" + challenger.uid
    return (
        <div className = "imgContainer firstContainer">
            <Link to={path}>
                <img src = {imgContainer}/>
                <div className = "firstPrize">
                    <img src = {challenger.imageURL}/>
                </div>
                <p>{challenger.vote} 표</p>
            </Link>
        </div>
    );
};

export default TopItem;