import React from 'react';
import contestImg from '../../contestImg.png'

const Ranking = ({challenger, index}) => {
    return (
        <li>
            <p> { challenger.rank } 위</p>
            <img src={contestImg}/>
            <img src={challenger.imageURL}/>
            <p> { challenger.name } 님</p>
            <p> { challenger.vote } 표</p>
        </li>
    );
};

export default Ranking;