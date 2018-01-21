import React, { Component } from 'react';

class User extends Component {


  logInCallback() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  logOutCallback() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {

    const currentName = (
      <h3>
      {this.props.currentUser === null ? "Welcome Guest!" : this.props.currentUser.displayName}
      </h3>
    );

    return (
      <div>
        <div>{currentName}</div>
        <button onClick={ (e) => this.logInCallback(e) }>Sign In</button>
        <button onClick={ (e) => this.logOutCallback(e) }>Sign Out</button>
      </div>
    );
  }
}


export default User;
