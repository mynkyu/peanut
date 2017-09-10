import React from 'react';


const Challenger = ({challenger}) => {
    if (!challenger) {
        return <div></div> 
    }

    return (
        <div>
            <img src={challenger.imageURL}/>
            <p>그 분과 {challenger.similarity}% 닮은 꼴</p>
            <p>{challenger.name} 님!</p>
            <p>{challenger.comment}</p>
        </div>
    );
};

export default Challenger;