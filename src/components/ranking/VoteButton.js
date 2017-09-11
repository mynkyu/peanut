import React from 'react';

const VoteButton = ({isVote}) => {
    var innerText = '투표하기'
    if (isVote != null) {
        if(isVote) {
            innerText = '이미 투표하셨습니다'
        } else {
            innerText = '투표하기'
        }
    }

    return (
        <div>
            {innerText}
        </div>
    );
};

export default VoteButton;