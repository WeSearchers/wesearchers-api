import React, { Component } from "react";

class ProfileProject extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          "col-md-12 " + (this.props.toShow == "project" ? "show" : "hidden")
        }
      >
        <div className="section-title">Projects (5)</div>
        <div className="section-card project">
          <div className="project-header">
            <div>Competition Policy - EU Law</div>
            <div>data/hour</div>
          </div>
          <div className="sub-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque
            tincidunt scelerisque libero. Nunca dapibus tortor vel mi dapibus
            sollicitudin. Integer in sapien. Nullam at arcu a est sollicitudin
            euismod. Aenean id metus id velit ullamcorper pulvinar. Et harum
            quidem rerum facilis est et expedita distinctio. Nam quis nulla.
            Fusce aliquam vestibulum ipsum. Praesent id justo in neque elementum
            ultrices. Duis condimentum augue id magna semper rutrum. Et harum
            quidem rerum facilis est et expedita distinctio.
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileProject;
