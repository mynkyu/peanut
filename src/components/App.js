import React from 'react';
import FBLogIn from './FBLogIn'
import Kakao from './Kakao'

class App extends React.Component {

  render(){
    return (
      <div>
        <FBLogIn/>
        <Kakao/>
      </div>
    );
  }
}

export default App;
