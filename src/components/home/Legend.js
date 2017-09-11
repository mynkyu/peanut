import React, { Component } from 'react';

import trophy from '../../trophy_for_export.png'
import './Legend.css'

class Legend extends Component{
    render() {
        return (
            
            
            <div className = "seeLegendLink" >
                
                    <div className = "trophyImage">
                        <div>
                            <img src = {trophy}/> 
                        </div>
                    
                    </div>
                    <p>명예의 전당</p>
                
            </div>

            
        );
    }
}

export default Legend;