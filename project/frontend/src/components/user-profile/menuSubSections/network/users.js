import React, { Component } from "react";
import User from "./user";
import Follower from "./follower";

class Users extends Component {
  state = {};
  render() {
    return (
      /* jmmonteiro network users (como disse na page network.js passar info para cada um) através do fetch */
      <div className={"network-user-container " + this.props.visible}>
        {this.props.title == "Advisors" ? <User /> : null}
        {this.props.title == "Advisors" ? <User /> : null}
        {this.props.title == "Followers" || this.props.title == "Following" ? (
          <Follower />
        ) : null}
        {this.props.title == "Followers" || this.props.title == "Following" ? (
          <Follower />
        ) : null}
      </div>
    );
  }
}

export default Users;
