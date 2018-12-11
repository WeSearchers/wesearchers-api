import React, { Component } from "react";
import Request from "../../request";

class NavBar extends Component {
  state = {
    hambState: "hidden"
  };

  handleClickHamb = hambState => {
    if (this.state.hambState != hambState) {
      this.setState({ hambState: hambState });
    } else {
      this.setState({ hambState: "hidden" });
    }
  };

  static clickButton(ev) {
    switch (ev.currentTarget.id) {
      case "home":
        window.location.assign(window.location.origin + "/");
        break;
      case "profile":
        window.location.assign(window.location.origin + "/user/profile");
        break;
      case "settings":
        window.location.assign(window.location.origin + "/user/settings");
        break;
      case "resources":
        window.location.assign(window.location.origin + "/user/resources");
        break;
    }
  }

  logout() {
    Request.post("api/user/logout").then(response => {
      window.location.assign(window.location.origin + "/");
    });
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="container max-container nav-bar-container">
          <div className="row">
            <div className="logo-nav" id="home" onClick={NavBar.clickButton} />
            <ul className="menu">
              <li id="profile" onClick={NavBar.clickButton}>
                Profile
              </li>
              <li id="resources" onClick={NavBar.clickButton}>
                Resources
              </li>
              <li className="logout" onClick={this.logout}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
