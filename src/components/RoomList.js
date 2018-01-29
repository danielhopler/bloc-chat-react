import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
   super(props);
   this.state = {
     rooms: [],
     newRoomName: ''
   };
   this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange = (e) => {
      this.setState({ newRoomName: e.target.value })
    }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });

    this.roomsRef.on('child_removed', snapshot => {
      const deletedRoom = snapshot.val();
      deletedRoom.key = snapshot.key;
      return alert(deletedRoom.name+" was deleted!");
    });
  }

  createRoom = (e) => {
    e.preventDefault();
    if (!this.state.newRoomName) { return}
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({ newRoomName: '' });
  }


  chooseRoom(room){
    this.props.chooseActiveRoomCallback(room);
  }

  deleteRoom(room) {
    if(!this.props.activeRoom) { return}
    this.roomsRef.child(room.key).remove();
    this.setState({rooms: this.state.rooms.filter( (oldroom) => {return oldroom.key !== room.key}) });

    }


  render() {

    const roomLists = this.state.rooms.map( room =>
      <li key={room.key} onClick={(e) => this.chooseRoom(room)}>{room.name}</li>
    );

    return (
      <section className="room-list">
        <h1 >{this.props.activeRoom.name || 'Choose Room'}</h1>
        <ul>{roomLists}</ul>

        <form onSubmit= {this.createRoom}>
          <input type="text" value= {this.state.newRoomName} onChange={this.handleChange}/>
          <input type="submit" value="Add a Room"/>
        </form>

        <form  onSubmit={this.deleteRoom.bind(this, this.props.activeRoom)}>
        <input type="submit" value="Delete" />
        </form>

      </section>
    );
  }
}


export default RoomList;
