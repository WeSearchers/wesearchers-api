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
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>Last Name</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>ORCID</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Please make sure your orcid has 16 numbers.</p>
        </div>
        <label>Affiliation</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>Research unit</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>Email</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>Skype</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
        <label>Biography</label>
        <textarea placeholder="..." />
        <label>Interests</label>
        <input type="text"/>
        <div className="wrongpass">
        <p>Not a valide answer.</p>
        </div>
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
