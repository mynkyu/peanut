import React from 'react';
import userOffImage from '../../userOffImg.png'
import userOff2Image from '../../userOnImg.png'

const Response = ({face, response}) => {
    function refresh() {
        window.location.reload()
    }

    const i0 = userOffImage
    const i1 = userOff2Image
    // cons
    // const i0 = URL.createObjectURL(face[0].image)
    // const i1 = URL.createObjectURL(face[1].image)
    return (
        <div>
            <div> 
                <div>
                    <img src={i0}/>
                    {response[0]} 
                </div>
                <div>
                    <img src={i1}/>
                    {response[1]} 
                </div>
                <div>
                    <button onClick={this.refresh}>다시하기</button>
                </div>
            </div>
            
        </div>
    );
};

export default Response;