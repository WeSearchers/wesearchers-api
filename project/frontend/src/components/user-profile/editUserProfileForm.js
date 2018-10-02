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
          <label>Course</label>
          <input type="text" placeholder="..." />
          <label>Institution</label>
          <input type="text" placeholder="..." />
          <label>ORCID</label>
          <input type="text" placeholder="..." />
          <label>Email</label>
          <input type="text" placeholder="..." />
          <label>Skype</label>
          <input type="text" placeholder="..." />
          <label>Presentation</label>
          <textarea type="text" placeholder="..." />
          <label>Areas of Interest</label>
          <select multiple>
            <option value="volvo">Design</option>
            <option value="saab">Economy</option>
            <option value="opel">Food</option>
            <option value="audi">Cience</option>
          </select>
          <label>Languages</label>
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
