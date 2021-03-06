import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      activeUser : '',

    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setUser = this.setUser.bind(this);
    }

    setActiveRoom(name) {
      console.log(name)
      this.setState({
        activeRoom: name

      })
    }

    setUser(user) {
      this.setState({activeUser : user})
    }

    setMessage(message) {
      this.setState({ activeMessage: message })
    }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <User firebase= {firebase} setUser={this.setUser} user={this.state.activeUser} />
        <RoomList firebase= { firebase } activeRoom={this.state.activeRoom}  createRoom={() => this.createRoom() } setActiveRoom={this.setActiveRoom }/>
        <MessageList firebase={ firebase } setUser={this.setUser} user={this.state.activeUser} activeRoom={this.state.activeRoom} setMessage={this.setMessage} />
      </div>
    );
  }
}

export default App;
