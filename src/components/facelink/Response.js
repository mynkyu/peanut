import React from 'react'

import './Response.css'

import userOffImage from '../../userOffImg.png'
import userOff2Image from '../../userOnImg.png'

const Response = ({face, response}) => {
    function refresh() {
        window.location.reload()
    }

    const i0 = userOffImage
    const i1 = userOff2Image
    response = ['결과 1번', '결과 2번']

    // const i0 = URL.createObjectURL(face[0].image)
    // const i1 = URL.createObjectURL(face[1].image)
    return (
        <div>
            <div className='responseContainer'> 
                <div className='responseItem'>
                    <p className='responseText'>
                        <img src={i0} className='responseImg'/> 
                        {response[0]}
                    </p>
                </div>
                <div className='responseItem'>
                    <p className='responseText'>
                        <img src={i1} className='responseImg'/>
                        {response[1]}
                    </p>
                </div>
                <div>
                    <button onClick={refresh}>사진 선택으로 되돌아가기</button>
                </div>
            </div>
            
        </div>
    );
};

export default Response;