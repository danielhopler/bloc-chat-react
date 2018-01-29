import React, { Component } from 'react';
import './Messages.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", content: "", sentAt: "", roomId: "", messages: [] };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleChange= (e) => {
    this.setState({
      username: this.props.currentUser.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
  }

  createMessage= (e) => {
    e.preventDefault();
    if (!this.state.content) { return}
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({username: "", content: "", sentAt: "", roomId: ""})
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  render() {

    const messageLists = this.state.messages.map( message => {
      if (message.roomId === this.props.activeRoom.key) {
        return <li key={message.key}>{message.content}</li>
      }
      return null;
    });

    const newMessage = (
      <form onSubmit={this.createMessage}>
        <input id="message-content" type="text" value={this.state.content} onChange={this.handleChange}/>
        <input id="send-button" type="submit" value="Send" />
      </form>
    );

    return (
      <section>
        <ul className="message-list">{messageLists}</ul>
        <div className="new-message">{newMessage}</div>
      </section>
    );
  }
}


export default MessageList;
