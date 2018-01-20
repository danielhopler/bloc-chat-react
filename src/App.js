import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {activeRoom: "" }
  }

  chooseActiveRoomCallback = (room) => {
    this.setState({activeRoom:room});
  }

  render() {

    return (
      <div className="App">
      <h1>{this.state.activeRoom.name || 'Choose Room'}</h1>
      <RoomList
        firebase={firebase}
        chooseActiveRoomCallback={this.chooseActiveRoomCallback}
      />
      {this.state.activeRoom.key ?
      <MessageList
        firebase={firebase}
        activeRoom= {this.state.activeRoom}
      />
      : null
      }
      </div>
    );
  }
}

export default App;
