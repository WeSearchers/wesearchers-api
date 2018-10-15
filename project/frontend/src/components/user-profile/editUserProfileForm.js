import React, { Component } from "react";

class EditUserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      orcid: "",
      bio: "",
      image: null,
      interests: "",
      institution: "",
    };
  }
  render() {
    return (
      <div className="edit-user-profile section-card">
        <h3>Edit Profile</h3>
        <a href="/user/profile" className="fa fa-times" />
        <label>First Name</label>
        <input type="text" placeholder="..." />
        <label>Last Name</label>
        <input type="text" placeholder="..." />
        <label>ORCID</label>
        <input type="text" placeholder="..." />
        <label>Affiliation</label>
        <input type="text" placeholder="..." />
        <label>Research unit</label>
        <input type="text" placeholder="..." />
        <label>Email</label>
        <input type="text" placeholder="..." />
        <label>Skype</label>
        <input type="text" placeholder="..." />
        <label>Biography</label>
        <textarea placeholder="..." />
        <label>Interests</label>
        <input type="text"/>
        <label>language</label>
        <input type="text" placeholder="..." />
        <button type="submit" value="">
          save changes
        </button>
      </div>
    );
  }
}

export default EditUserProfileForm;
