import React, { Component } from "react";
import Jumbotron from "../components/feed/jumbotron";
import NavBar from "../components/navbar/navBar";
import Pub1 from "../components/feed/pub1";
import Pub2 from "../components/feed/pub2";
import AddComent from "../components/feed/addcoment";
import Popup from "../components/feed/popup";
import TestFetch from "../components/textfetch";
import LoginSignUp from "../components/Login/LoginSignUp";

class SignUp extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginSignUp />
      </React.Fragment>
    );
  }
}

export default SignUp;
