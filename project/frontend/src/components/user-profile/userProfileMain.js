import React, { Component } from "react";
import NavBar from "../navBar";
import UserProfileHeader from "./userProfileHeader";
import UserProfileMenu from "./userProfileMenu";
import Request from '../../request'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      email: '',
      first_name: '',
      last_name: '',
      image_data: '',
      institution: '',
      orcid: '',
      user_id: '',
      username: '',
      interests: [],
    }
  }

  componentDidMount() {
    Request.get('api/user/profile/0', {}).then(response => {
      response.json().then(data => {
        //console.log(data)
        this.setState(
          {
            bio: data.bio,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            image_data: data.image_data,
            institution: data.institution,
            orcid: data.orcid,
            user_id: data.user_id,
            username: data.username,
            interests: data.interests,
          }
        )
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
