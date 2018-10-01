import React, { Component } from "react";
import ProfileAbout from "./menuSubSections/profileAbout";
import ProfileNetwork from "./menuSubSections/profileNetwork";
import ProfilePublication from "./menuSubSections/profilePublication";

class UserProfileMenuSection extends Component {
  state = {};
  render() {
    return (
      <div className="container user-profile-menu-section">
        <div className="row">
          <ProfileAbout toShow={this.props.toShow} />
          <ProfileNetwork toShow={this.props.toShow} />
          <ProfilePublication toShow={this.props.toShow} />
        </div>
      </div>
    );
  }
}
export default UserProfileMenuSection;
