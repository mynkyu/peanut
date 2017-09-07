import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import  './Vote.css'

import heartImg from '../../main_contest_heart_icon.png'

class Vote extends Component {
    render() {
        return (
            <div className = "voteSituationLink" >
                <div className = "heartImage">
                    <img src = {heartImg} />  
                </div>
                
                <Link to="/ranking" >
                    <p>실시간 투표 상황</p>
                </Link>
            </div>
        );
    }
}

export default Vote;