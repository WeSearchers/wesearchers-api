import React, { Component } from "react";

class EditUserProfileForm extends Component {
  state = {};
  render() {
    return (
      <div className="edit-user-profile section-card">
        <h3>Edit Profile</h3>
        <a href="/user/profile" className="fa fa-times" />

        <form action="#">
          <label>Name</label>
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
          <textarea type="text" placeholder="..." />
          <label>Research interests</label>
          <select multiple>
            <option value="volvo">Design</option>
            <option value="saab">Economy</option>
            <option value="opel">Food</option>
            <option value="audi">Cience</option>
          </select>
          <label>language</label>
          <input type="text" placeholder="..." />
          <button type="submit" value="">
            save changes
          </button>
        </form>
      </div>
    );
  }
}

export default EditUserProfileForm;
