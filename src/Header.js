import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Profile from './routes/Profile'

import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <NavLink exact to="/" className="item"> <p className="content">facelink</p> </NavLink>
                <Profile/>
            </div>
        );
    }
}

export default Header;