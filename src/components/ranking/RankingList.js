import React from 'react';
import Ranking from './Ranking'

const RankingList = ({challengers}) => {

    const rankingList = challengers.map(
        (challenger, index) => (
            <Ranking 
                challenger={ challenger } 
                key = { index }
            />
        )
    )
    return (
        <ul>
            {rankingList}
        </ul>
    );
};

export default RankingList;