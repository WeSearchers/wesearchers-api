import React, { Component } from "react";
import User from "./user";

class Users extends Component {
  state = {};
  render() {
    return (
      /* jmmonteiro network users (como disse na page network.js passar info para cada um) através do fetch */
      <div className={"network-user-container " + this.props.visible}>
        <User />
        <User />
      </div>
    );
  }
}

export default Users;
