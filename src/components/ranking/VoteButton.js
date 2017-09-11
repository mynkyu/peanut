import React from 'react';

import './VoteButton.css'

const VoteButton = ({isVote}) => {
    var innerText = '이 후보에게 투표하기'
    if (isVote != null) {
        if(isVote) {
            innerText = '이미 투표하셨습니다'
        } else {
            innerText = '이 후보에게 투표하기'
        }
    }

    return (
        <div className = "voteText">
            <p>{innerText}</p>
        </div>
    );
};

export default VoteButton;