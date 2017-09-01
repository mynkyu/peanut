import React from 'react';
import FBLogIn from './FBLogIn'
import Firebase from './Firebase'
import Kakao from './Kakao'

class App extends React.Component {

  render(){
    return (
      <div>
        <FBLogIn/>
        <Kakao/>
        <Firebase/>
      </div>
    );
  }
}

export default App;
