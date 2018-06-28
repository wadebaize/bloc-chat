import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDT-6BLFOJK4RCaWV1ndMqWYRM2oY-8vD8",
    authDomain: "bloc-chat-2000.firebaseapp.com",
    databaseURL: "https://bloc-chat-2000.firebaseio.com",
    projectId: "bloc-chat-2000",
    storageBucket: "bloc-chat-2000.appspot.com",
    messagingSenderId: "328649239902"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom : '',


    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
      this.setMessage = this.setMessage.bind(this);
    }

    setActiveRoom(roomId) {
      console.log(roomId)
      this.setState({
        activeRoom: roomId

      })
    }

    setMessage(message) {
      this.setState({ activeMessage: message })
    }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList firebase= { firebase } createRoom={() => this.createRoom() } setActiveRoom={this.setActiveRoom } />
        <MessageList firebase = { firebase } activeRoom={ this.state.activeRoom }  />

      </div>
    );
  }
}

export default App;
