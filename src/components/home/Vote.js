import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import  './Vote.css'

import personImg from '../../person_img.png'

class Vote extends Component {
    render() {
        return (
            
            
            <div className = "voteSituationLink" >
                <Link to="/feed">
                {/* <Link to="/ranking"> */}
                    <div className = "personImage">
                        <div>
                            <img src = {personImg} /> 
                        </div>
                    <p>실시간 후보 현황</p>
                    </div>
                </Link>
            </div>

            
        );
    }
}

export default Vote;