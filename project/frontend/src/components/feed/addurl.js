import React, { Component } from "react";
import fb from "../../images/facebook-logo-button.png";
import google from "../../images/google-plus-logo-button.png";
import linkedin from "../../images/linkedin-logo-button.png";
import twitter from "../../images/twitter-logo-button.png";

class Addurl extends React.Component {
  render() {
    return (
      <div className="  m-2 d-flex flex-column  addurl">
      <h2 className="mb-4">The url to your article </h2>
      <input
      className="form-control z-depth-1"
      name="url"
      onChange={this.handleChange}
      placeholder="Article URL"
      />
      <button
        type="button"
        className="btn-save btn text-white m-1 ml-4 mt-2"
      >
        Save
      </button>
      </div>
    );
  }
}

export default Addurl;
