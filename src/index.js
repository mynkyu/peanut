import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBjI2D6kStfw3wotgW4u09GXkluHbJVxe0",
  authDomain: "peanut-5b51b.firebaseapp.com",
  databaseURL: "https://peanut-5b51b.firebaseio.com",
  projectId: "peanut-5b51b",
  storageBucket: "peanut-5b51b.appspot.com",
  messagingSenderId: "36526707240"
};
firebase.initializeApp(config);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
