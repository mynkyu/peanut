import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

const logged = false;
class MyPage extends Component {
    componentDidMount(){
        console.log("MyPage")
    }

    render() {
        return (
            <div>
                {
                    !logged && <Redirect to ="/login" />
                }
            </div>
        );
    }
}

export default MyPage;