import React, { Component } from "react";
import SettingsAndPrivacy from "./sideMenu/settingsAndPrivacy";

class SideMenuMain extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-4 side-menu">
        <SettingsAndPrivacy
          subMenu={this.props.subMenu}
          onShowSubMenu={this.props.onShowSubMenu}
        />
      </div>
    );
  }
}

export default SideMenuMain;
