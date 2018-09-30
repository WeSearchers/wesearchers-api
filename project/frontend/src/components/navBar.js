import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="nav-bar">
        <div className="container nav-bar-container">
          <ul className="menu">
            <li>
              <i className="fa fa-bars" />
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
            <i className="fa fa-bars" />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
