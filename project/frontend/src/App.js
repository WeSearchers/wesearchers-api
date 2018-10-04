import React, { Component } from "react";
import "./App.css";
import Feed from "./views/feed";
import SignUp from "./views/signup";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SignUp/>
      </React.Fragment>
    );
  }
}

export default App;
