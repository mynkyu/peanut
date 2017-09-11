import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({challenger, index}) => {
    const path = '/feed/' + challenger.uid
    return (
        <div>
            <Link to={path}>
                <div className="challenger" key={index}>
                    <img src={challenger.imageURL} width="150" height="150" />
                    <p>올린 시각 {challenger.time}</p>
                </div>
            </Link>
        </div>
    );
};

export default Feed;