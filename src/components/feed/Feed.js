import React from 'react';
import { Link } from 'react-router-dom';

import './Feed.css'

const Feed = ({challenger, index}) => {
    const path = '/feed/' + challenger.uid
    return (
        <div>
            <Link to={path}>
                <div className="challengerInFeed" key={index}>
                    <img src={challenger.imageURL} width="150" height="150" />
                </div>
            </Link>
        </div>
    );
};

export default Feed;