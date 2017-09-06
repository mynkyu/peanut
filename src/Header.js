import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Profile from './routes/Profile'
import peanutLogo from './peanut-logo.png'
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div id = "dummy"></div>
                
                <NavLink exact to="/" className="item"> 
                    <img src = {peanutLogo} className = "logoImage"></img>
                </NavLink>
                
                <Profile/>

            </div>
        );
    }
}

export default Header;