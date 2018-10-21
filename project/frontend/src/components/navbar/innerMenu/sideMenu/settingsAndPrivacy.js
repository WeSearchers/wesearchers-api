import React, { Component } from "react";

class SettingsAndPrivacy extends Component {
  state = {};
  render() {
    return (
      <ul>
        <h5>Settings and Privacy</h5>
        <a onClick={() => this.props.onShowSubMenu("changepassword")}>
          <li
            className={
              this.props.subMenu == "changepassword"
                ? "clicked-side-menu-item"
                : ""
            }
          >
            change password
          </li>
        </a>
        <a onClick={() => this.props.onShowSubMenu("empty1")}>
          <li
            className={
              this.props.subMenu == "empty1" ? "clicked-side-menu-item" : ""
            }
          >
            sub-menu 2
          </li>
        </a>
        <a onClick={() => this.props.onShowSubMenu("empty2")}>
          <li
            className={
              this.props.subMenu == "empty2" ? "clicked-side-menu-item" : ""
            }
          >
            sub-menu 3
          </li>
        </a>
        <a onClick={() => this.props.onShowSubMenu("empty3")}>
          <li
            className={
              this.props.subMenu == "empty3" ? "clicked-side-menu-item" : ""
            }
          >
            sub-menu 4
          </li>
        </a>
      </ul>
    );
  }
}

export default SettingsAndPrivacy;
