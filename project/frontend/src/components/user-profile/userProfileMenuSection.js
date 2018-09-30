import React, { Component } from "react";
import ProfileAbout from "./menuSubSections/profileAbout";
import ProfileNetwork from "./menuSubSections/profileNetwork";

class UserProfileMenuSection extends Component {
  state = {};
  render() {
    return (
      <div className="container user-profile-menu-section">
        <div className="row">
          <ProfileAbout />
          {/* <ProfileNetwork />*/}
        </div>
      </div>
    );
  }
}
export default UserProfileMenuSection;
