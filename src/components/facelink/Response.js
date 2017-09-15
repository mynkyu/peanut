import React from 'react';

const Response = ({response}) => {
    // function refresh() {
    //     window.location.reload()
    // }
    return (
        <div>
            <div> 
                <div>
                    <p>
                        {response[0]} 
                        <bar/>
                        {response[1]} 
                    </p>
                </div>
                <div>
                    <button onClick={this.refresh}>다시하기</button>
                </div>
            </div>
            
        </div>
    );
};

export default Response;