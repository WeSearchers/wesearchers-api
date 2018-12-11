import React, { Component } from "react";

class UserProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container max-container user-profile">
        <div className="row user-header">
          <div
            className="user-photo"
            style={{
              "background-image":
                "url('" +
                "data:image/png;base64, " +
                this.props.data.image_data +
                "')"
            }}
          />

          <div className="user-info section-card">
            <div className="user-name">
              {this.props.data.first_name + " " + this.props.data.last_name}
              {/* <a
                href="/user/edit"
                className="edit-profile fa fa-pencil-square-o"
              /> */}
            </div>
            <ul className="user-aux-info">
              {/* jmmonteiro colocar informação curricular através do fetch */}
              <li>ORCID : {this.props.data.orcid} </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileHeader;
