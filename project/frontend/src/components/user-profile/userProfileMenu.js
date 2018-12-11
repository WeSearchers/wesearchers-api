import React, { Component } from "react";
import UserProfileMenuSection from "./userProfileMenuSection";

class UserProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSection: "about"
    };
  }

  handleShowSubSection(section) {
    if (this.state.showSection !== section) {
      this.setState({
        showSection: section
      });
      console.log(this.state.showSection);
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* jmmonteiro aqui estão as secções que ativam cada sub-secção do perfil de utilizador: about network etc...*/}
        {/* jmmonteiro ao clicar em cada um deve conter já a informação renderizada */}
        <div className="container max-container profile-menu">
          <div className="row menu-row">
            <div className="col-md-3 pd10">
              <a
                className={
                  "menu-item " +
                  (this.state.showSection == "about" ? "link-selected" : "")
                }
                onClick={() => this.handleShowSubSection("about")}
              >
                <i className="fa fa-user" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a
                className={
                  "menu-item " +
                  (this.state.showSection == "network" ? "link-selected" : "")
                }
                onClick={() => this.handleShowSubSection("network")}
              >
                <i className="fa fa-users" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a
                className={
                  "menu-item " +
                  (this.state.showSection == "project" ? "link-selected" : "")
                }
                onClick={() => this.handleShowSubSection("project")}
              >
                <i className="fa fa-archive" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a
                className={
                  "menu-item " +
                  (this.state.showSection == "posts" ? "link-selected" : "")
                }
                onClick={() => this.handleShowSubSection("posts")}
              >
                <i className="fa fa-file-text" />
              </a>
            </div>
          </div>
        </div>
        <UserProfileMenuSection
          data={this.props.data}
          toShow={this.state.showSection}
        />
      </React.Fragment>
    );
  }
}

export default UserProfileMenu;
