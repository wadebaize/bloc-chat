import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: {
                username: '',
                content: '',
                roomId: '',
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            },
            newMessage: ''
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createMessage = this.createMessage.bind(this);

    }

    createMessage() {
        this.messagesRef.push({
            content: this.state.newMessage,
            roomId: this.props.activeRoom,
            username: this.props.user ? this.props.user.displayName : 'Guest',
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({ newMessage: ''});
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newMessage !== '') {
        this.createMessage(this.state.newMessage);
        this.setState({newMessage: ''});
        }
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }



    render() {
        return (
          <div>
            <h3>{ this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h3>
              <ul>
                { this.state.messages.filter(message => message.roomId == this.props.activeRoom).map((message, index) => (<li key={index}> <b>{message.username}</b> <br /> {message.content} </li>),
                )}
              </ul>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.newmessage} onChange={this.handleChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>
    );
  }
}


export default MessageList;
