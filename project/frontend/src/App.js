import React, { Component } from "react";
import Jumbotron from "./components/jumbotron";
import NavBar from "./components/navbar";
import Pub1 from "./components/pub1";
import Pub2 from "./components/pub2";
import AddComent from "./components/addcoment";
import "./App.css";
import SignupForm from "./components/SignupForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Validator from "./components/Validator";
import queryString from "query-string";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Jumbotron />
        <Pub1 />
        <Pub2 />
        <Pub2 />
        <Pub1 />
        <Pub1 />
        <Pub2 />
        <Pub2 />
        <Pub2 />
        <Pub2 />
      </React.Fragment>
    );
  }
}

export default App;
