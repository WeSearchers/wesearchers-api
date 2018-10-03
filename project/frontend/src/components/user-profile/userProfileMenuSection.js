import React, { Component } from "react";
import ProfileAbout from "./menuSubSections/profileAbout";
import ProfileNetwork from "./menuSubSections/profileNetwork";
import ProfilePublication from "./menuSubSections/profilePublication";
import ProfileProject from "./menuSubSections/profileProject";

class UserProfileMenuSection extends Component {
  state = {};
  render() {
    return (
      <div className="container user-profile-menu-section">
        <div className="row">
          {/* jmmonteiro aqui são chamadas as sub-secções do perfil */}
          {/* jmmonteiro talvez passes a informação por aqui através do props */}
          <ProfileAbout toShow={this.props.toShow} />
          <ProfileNetwork toShow={this.props.toShow} />
          <ProfileProject toShow={this.props.toShow} />
          <ProfilePublication toShow={this.props.toShow} />
        </div>
      </div>
    );
  }
}
export default UserProfileMenuSection;
