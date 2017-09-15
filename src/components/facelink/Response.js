import React from 'react'

import './Response.css'

const Response = ({face, response}) => {
    function refresh() {
        window.location.reload()
    }

    const i0 = URL.createObjectURL(face[0].image)
    const i1 = URL.createObjectURL(face[1].image)
    return (
        <div>
            <div className='responseContainer'> 
                <div className='responseItem'>
                    <img src={i0}/> 
                    <p>{response[0]}</p>
                </div>
                <div className='responseItem'>
                    <img src={i1}/> 
                    <p>{response[1]}</p>
                </div>
                <div className="backToPicture">
                    <button onClick={refresh}>사진 선택으로 되돌아가기</button>
                </div>
            </div>
            
        </div>
    );
};

export default Response;