import React, { Component } from "react";
import Jumbotron from "../components/feed/jumbotron";
import NavBar from "../components/feed/navbar";
import Pub1 from "../components/feed/pub1";
import Pub2 from "../components/feed/pub2";
import AddComent from "../components/feed/addcoment";
import Popup from "../components/feed/popup";

class Feed extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Pub1 />
        <Pub2 />
        <Pub1 />
        <Pub1 />
        <Pub1 />
        <Pub2 />
      </React.Fragment>
    );
  }
}

export default Feed;
