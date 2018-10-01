import React, { Component } from "react";
import User from "./user";

class Users extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          "network-user-container " +
          (this.props.visible == "show" ? "show" : "hidden")
        }
      >
        <User />
        <User />
      </div>
    );
  }
}

export default Users;
