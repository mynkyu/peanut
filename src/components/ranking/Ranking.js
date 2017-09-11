import React from 'react';
import { Link } from 'react-router-dom'

import contestImg from '../../sample2.jpg'
import contest2Ring from '../../main_contest_big2rings.png'

import medal1 from '../../1st_medal.png'
import medal2 from '../../2nd_medal.png'
import medal3 from '../../3rd_medal.png'

import './Ranking.css'

const Ranking = ({challenger, index}) => {
    const path = '/ranking/' + challenger.uid
    return (
        <li className = "challengerRankingComponent">
            <div className = "imageContainer">
                    <img src = {contest2Ring}/>

                    <div className = "contestImg">
                        <img src = {contestImg}/>
                    </div>
                    <Link to={path}>
                        <div className = "challengerImg">
                            <img src = {challenger.imageURL}/>
                        </div>
                    </Link>

                    <div className = "medal">
                        
                    </div>


            </div>
            
            <p className = "challengerName"> { challenger.name } 님</p>
            <p className = "challengerVoteNumber"> { challenger.vote } 표</p>
           
           

        </li>
    );
};

export default Ranking;