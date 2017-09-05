import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Vote extends Component {
    render() {
        return (
            <div>
                <div><Link to="/ranking">실시간 투표 상황</Link></div>
            </div>
        );
    }
}

export default Vote;