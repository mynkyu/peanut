import React from 'react';
import Ranking from './Ranking'

import './RankingList.css'

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
        <ul className  = "rankingList">
            {rankingList}
        </ul>
    );
};

export default RankingList;