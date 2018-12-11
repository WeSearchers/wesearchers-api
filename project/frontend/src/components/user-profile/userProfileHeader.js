import React, { Component } from "react";

class UserProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log(this.props.data);
    return (
      <div className="container user-profile">
        <div className="row user-header">
          <div className="user-photo" >
            <img src={"data:image/png;base64, " + this.props.data.image_data} width={"100%"} style={{"clip-path": "circle(50% at center)"}}/>
          </div>

          <div className="user-info section-card">
            <div className="user-name">
              {this.props.data.name}
              <a href="/user/edit" className="edit-profile fa fa-pencil-square-o" />
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
