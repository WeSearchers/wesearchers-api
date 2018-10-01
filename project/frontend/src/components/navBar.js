import React, { Component } from "react";
import "../navbar.css";

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

  render() {
    return (
      <div className="nav-bar">
        <div className="container nav-bar-container">
          <ul className="menu">
            <li>
              <i className="fa fa-window-maximize" />
            </li>
            <li>
              <i className="fa fa-user" />
            </li>
            <li>
              <i className="fa fa-comment" />
            </li>
            <li>
              <i className="fa fa-bell" />
            </li>
            <li>
              <i className="fa fa-search" />
            </li>
          </ul>
          <div className="hamb-menu">
            <i className="fa fa-bars" onClick={this.handleClickHamb} />
            <div className={"hamb-navigation " + this.state.hambState}>
              <ul>
                <li>
                  <span>Requests</span> <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>Network</span> <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>Community</span> <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>Settings and Privacy</span>{" "}
                  <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>Help</span> <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>About the Platform</span>{" "}
                  <i className="fa  fa-chevron-right" />
                </li>
                <li>
                  <span>Logout</span> <i className="fa  fa-chevron-right" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
