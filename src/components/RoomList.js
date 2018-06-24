import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount() {
   this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key;
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
       <section>
         <section>

           <form onSubmit={ (e) => this.handleRoomSubmit(e)}>
              <label>Create New Room </label>
              <input
                type="text"
                value={this.state.newRoomName}
                onChange={(e) => this.handleChange(e)}
                />
              <input
                type="submit"
                value="submit"
                />
           </form>

         </section>
         <section>

           {this.state.rooms.map ((room, index) =>
             <li key={index}>
               {room.name}
             </li>
             )
           }

         </section>
       </section>
    );
  }
}

export default RoomList;
