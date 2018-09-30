import React, { Component } from "react";
import NavBar from "../components/navBar";
import UserProfileHeader from "../components/user-profile/userProfileHeader";
import UserProfileMenu from "../components/user-profile/userProfileMenu";

class UserProfile extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <UserProfileHeader />
        <UserProfileMenu />
      </React.Fragment>
    );
  }
}

export default UserProfile;
