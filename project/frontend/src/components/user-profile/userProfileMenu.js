import React, { Component } from "react";
import UserProfileMenuSection from "./userProfileMenuSection";

class UserProfileMenu extends Component {
  state = {
    networkclicked: false
  };

  handleAddSectionNetwork() {
    this.setState({
      networkclicked: true
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container profile-menu">
          <div className="row menu-row">
            <div className="col-md-3 pd10">
              <div className="menu-item" onClick={this.handleAddSectionNetwork}>
                <i className="fa fa-user" />
              </div>
            </div>
            <div className="col-md-3 pd10">
              <div className="menu-item">
                <i className="fa fa-users" />
              </div>
            </div>
            <div className="col-md-3 pd10">
              <div className="menu-item">
                <i className="fa fa-bar-chart" />
              </div>
            </div>
            <div className="col-md-3 pd10">
              <div className="menu-item">
                <i className="fa fa-file-text-o" />
              </div>
            </div>
          </div>
        </div>
        <UserProfileMenuSection />
        {/*{this.state.networkclicked ? <UserProfileMenuSection /> : null}*/}
      </React.Fragment>
    );
  }
}

export default UserProfileMenu;
