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
      </ul>
    );
  }
}

export default SettingsAndPrivacy;
