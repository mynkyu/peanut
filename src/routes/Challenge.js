import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Crop from '../components/challenge/Crop'
import Process from '../components/challenge/Process'

class Challenge extends Component {
    render() {
        return (
            <div>
                <Route exact path="/challenge" component={Crop}/>
                <Route path="/challenge/process" component={Process}/>
            </div>
        );
    }
}

export default Challenge;