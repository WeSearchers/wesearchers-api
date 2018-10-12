import React, { Component } from "react";
import User from "./user";
import Follower from "./follower";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  render() {
    console.log(this.props.data);
    return (
      /* jmmonteiro network users (como disse na page network.js passar info para cada um) através do fetch */
      <div className={"network-user-container " + this.props.visible}>
        {/*
        {this.props.title == "Advisors" ? <User /> : null}
        {this.props.title == "Advisors" ? <User /> : null}
        {this.props.title == "Followers" || this.props.title == "Following" ? (
          <Follower />
        ) : null}
        {this.props.title == "Followers" || this.props.title == "Following" ? (
          <Follower />
        ) : null}
        */}
        
        {
          this.props.data.map(person => {
            console.log(person);
            return( <Follower person={person} /> )
          })
        }
      </div>
    );
  }
}

export default Users;
