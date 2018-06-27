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
      activeMessage: ''
    };
  }

  chosenRoom(room){
    this.setState({room : this.state.activeRoom})
  }

  setMessage(message) {
    this.setState({ activeMessage: message })
  }

  render() {
    return (
      <div className="App">
        <header className= 'App-Header'>
        <h1>Welcome to Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} chosenRoom={this.state.chosenRoom} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />}
      </div>
    );
  }
}

export default App;
