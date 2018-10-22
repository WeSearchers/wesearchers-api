import React, { Component } from "react";
import UserChangePassword from "./subMenu/userChangePassword";

class SubMenuMain extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-8 actions">
        <UserChangePassword toShow={this.props.toShow} />
      </div>
    );
  }
}

export default SubMenuMain;
