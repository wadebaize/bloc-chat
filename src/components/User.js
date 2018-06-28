import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : ''
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => { this.props.setUser(user);
  });
}

handleSignIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

handleSignOut(){
  this.props.firebase.auth().signOut();
}

  render() {
    return(

      <div>
      <span> Logged in: {this.props.user ? this.props.user.displayName : 'Guest' } </span>
       <button onClick={this.handleSignIn}>
         Login
       </button>
       <button onClick={this.handleSignOut}>
         Logout
       </button>
     </div>
   );
 }
}

export default User;
