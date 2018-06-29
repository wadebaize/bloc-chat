import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.handleRoomSubmit = this.handleRoomSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createRoom(nameNewRoom){
  this.roomsRef.push({
    name: this.state.nameNewRoom
  });
}

  componentDidMount() {
   this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key
     this.setState({ rooms: this.state.rooms.concat( room ) });
   });
 }

 handleChange(e) {
  this.setState({newRoomName: e.target.value});
}

 handleRoomSubmit(e){
   e.preventDefault();
   if (this.state.newRoomName) {
     this.setState({newRoomName: ''});
     this.roomsRef.push({name: this.state.newRoomName,});
   }
 }

 render () {
     return (
       <div>
       <form onSubmit={this.handleRoomSubmit}>
        <h3> Create a Room </h3>
            <input type="text" value={this.state.nameNewRoom} placeholder="enter room name" onChange={this.handleChange} />
            <input type="submit" value="submit" />
         </form>
           <ul>
            { this.state.rooms.map( (room, index)  =>
            <li onClick={() => this.props.setActiveRoom(room.key)} key={ index }> { room.name }</li>
        )}

           </ul>
      </div>
    );
  }
}

export default RoomList;
