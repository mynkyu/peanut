import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Photo from '../components/challenge/Photo'
import Crop from '../components/challenge/Crop'
import Process from '../components/challenge/Process'
import Response from '../components/challenge/Response'

class Challenge extends Component {
    render() {
        return (
            <div>
                <Route exact path="/challenge" component={Photo}/>
                <Route path="/challenge/crop" component={Crop}/>
                <Route path="/challenge/process" component={Process}/>
                <Route path="/challenge/response/:response" component={Response}/>
            </div>
        );
    }
}

export default Challenge;