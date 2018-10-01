import React, { Component } from "react";
import "./App.css";
import Feed from "./views/feed";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Feed />
      </React.Fragment>
    );
  }
}

export default App;
