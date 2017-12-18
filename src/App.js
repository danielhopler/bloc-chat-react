import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAC4Bj7lqqk3KRIzJf1S2oiceaIskuRB5g",
    authDomain: "bloc-chat-5974e.firebaseapp.com",
    databaseURL: "https://bloc-chat-5974e.firebaseio.com",
    projectId: "bloc-chat-5974e",
    storageBucket: "bloc-chat-5974e.appspot.com",
    messagingSenderId: "172718334226"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
