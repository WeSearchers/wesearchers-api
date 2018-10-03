import React, { Component } from "react";

class UserProfileHeader extends Component {
  state = {};
  render() {
    return (
      <div className="container user-profile">
        <div className="row user-header">
          <div className="user-photo" />
          <div className="user-info section-card">
            {/* jmmonteiro colocar nome do utilizador através do fetch */}
            <div className="user-name">
              Michael Jordan
              <a href="/edit" className="edit-profile fa fa-pencil-square-o" />
            </div>
            <ul className="user-aux-info">
              {/* jmmonteiro colocar informação curricular através do fetch */}
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
