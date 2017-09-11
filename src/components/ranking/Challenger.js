import React from 'react';
import './Challenger.css'

import imgContainer from '../../main_contest_ring.png'

const Challenger = ({challenger}) => {
    if (!challenger) {
        return <div></div> 
    }

    return (
        <div className = "challengerContainer">
            <div className = "challengerImgContainer">
                <img src={imgContainer}></img>
                <div className="contestpProfileImage">
                    <img src={challenger.imageURL}/>    
                </div>
            </div>
            
            
            <p className = "similarityLabel">그 분과 {challenger.similarity}% 닮은 꼴</p>
            <p className = "nicknameLabel">{challenger.name} 님!</p>
            <div className = "commentBox">
                <p>{challenger.comment}</p>
            </div>
            
        </div>
    );
};

export default Challenger;