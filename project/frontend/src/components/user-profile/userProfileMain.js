import React, { Component } from "react";
import NavBar from "../navbar/navBar";
import UserProfileHeader from "./userProfileHeader";
import UserProfileMenu from "./userProfileMenu";
import Request from "../../request";
import ResourcesMain from "../resources/resourcesMain";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      email: "",
      name: "",
      image_data: "",
      institution: "",
      orcid: "",
      user_id: "",
      username: "",
      interests: [],
      twitter: false,
      reddit: false
    };
  }

  componentDidMount() {
    let id = new URLSearchParams(window.location.search).get("id");
    Request.get(
      "api/user/profile/" + (id === undefined || id === null ? 0 : id),
      {}
    ).then(response => {
      response.json().then(data => {
        //console.log(data)
        this.setState(data);
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <UserProfileHeader data={this.state} />
        <UserProfileMenu data={this.state} />
      </React.Fragment>
    );
  }
}

export default UserProfile;
