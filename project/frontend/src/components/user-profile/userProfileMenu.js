import React, { Component } from "react";
import UserProfileMenuSection from "./userProfileMenuSection";

class UserProfileMenu extends Component {
  state = {
    showSection: "network"
  };

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
        <div className="container profile-menu">
          <div className="row menu-row">
            <div className="col-md-3 pd10">
              <a
                className="menu-item"
                onClick={() => this.handleShowSubSection("about")}
              >
                <i className="fa fa-user" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a
                className="menu-item"
                onClick={() => this.handleShowSubSection("network")}
              >
                <i className="fa fa-users" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a className="menu-item ">
                <i className="fa fa-bar-chart" />
              </a>
            </div>
            <div className="col-md-3 pd10">
              <a
                className="menu-item"
                onClick={() => this.handleShowSubSection("posts")}
              >
                <i className="fa fa-file-text-o" />
              </a>
            </div>
          </div>
        </div>
        <UserProfileMenuSection toShow={this.state.showSection} />
      </React.Fragment>
    );
  }
}

export default UserProfileMenu;
