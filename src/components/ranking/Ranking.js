import React from 'react';
import { Link } from 'react-router-dom'

import contestImg from '../../sample2.jpg'
import contest2Ring from '../../main_contest_big2rings.png'
import contestRing from '../../main_contest_ring.png'

import medal1 from '../../1st_medal.png'
import medal2 from '../../2nd_medal.png'
import medal3 from '../../3rd_medal.png'

import './Ranking.css'

const Ranking = ({challenger, index}) => {
    const path = '/ranking/' + challenger.uid
    var medalImg = medal3
    switch (challenger.rank) {
        case 1: medalImg = medal1; break;
        case 2: medalImg = medal2; break;
        case 3: medalImg = medal3; break;
        default:
            break;
    }

    if (challenger.rank < 4) {
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
                            <img src = {medalImg}/>
                            <p className="rankingLabel">{challenger.rank}<span className="smallLabel">위</span></p>
                        </div>
                </div>
                
                
                <p className = "challengerName"> { challenger.name } 님</p>
                <p className = "challengerVoteNumber"> { challenger.vote } 표</p>
               
                
    
            </li>
        );
    }
    else{
        return(
            <li className = "challengerRankingSubComponent">
                <div className = "subImageContainer">
                    <img src = {challenger.imageURL}/>
                </div>
            
                <p className = "subChallengerName"> { challenger.name } 님</p>
                <p className = "subChallengerVoteNumber"> { challenger.vote } 표</p>

            </li>
        );
    }


    
};

export default Ranking;