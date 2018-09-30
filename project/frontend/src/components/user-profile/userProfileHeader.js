import React, { Component } from "react";

class UserProfileHeader extends Component {
  state = {};
  render() {
    return (
      <div className="container user-profile">
        <div className="row user-header">
          <div className="user-photo" />
          <div className="user-info section-card">
            <div className="user-name">
              Michael Jordan
              <i className="edit-profile fa fa-pencil-square-o" />
            </div>
            <ul className="user-aux-info">
              <li>
                <span className="label">Age:</span>
                20
              </li>
              <li>
                <span className="label">Course:</span>
                Design and Multimedia
              </li>
              <li>
                <span className="label">Institution:</span>
                Universidade de Coimbra
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileHeader;
