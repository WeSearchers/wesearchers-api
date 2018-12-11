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
        <div className="container nav-bar-container">
          <ul className="menu">
            <li className="logo-nav" id="home" onClick={NavBar.clickButton} />
            <li id="resources" onClick={NavBar.clickButton}>
              <i className="fa fa-floppy-o" />
            </li>
            <li id="profile" onClick={NavBar.clickButton}>
              <i className="fa fa-user" />
            </li>
          </ul>
          <div className="hamb-menu">
            <i className="fa fa-bars" onClick={this.handleClickHamb} />
            <div className={"hamb-navigation " + this.state.hambState}>
              <ul>
                <a>
                  <span>Requests</span> <i className="fa  fa-chevron-right" />
                </a>
                <a>
                  <span>Network</span> <i className="fa  fa-chevron-right" />
                </a>
                <a>
                  <span>Community</span> <i className="fa  fa-chevron-right" />
                </a>
                <a id="settings" onClick={NavBar.clickButton}>
                  <span>Settings and Privacy</span>{" "}
                  <i className="fa  fa-chevron-right" />
                </a>
                <a>
                  <span>Help</span> <i className="fa  fa-chevron-right" />
                </a>
                <a>
                  <span>About the Platform</span>{" "}
                  <i className="fa  fa-chevron-right" />
                </a>
                <a onClick={this.logout}>
                  <span>Logout</span> <i className="fa  fa-chevron-right" />
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
