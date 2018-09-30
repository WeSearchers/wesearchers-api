import React, { Component } from "react";
import Users from "./users";

class SubSection extends Component {
  state = {};

  render() {
    var displayElm = false;

    return (
      <React.Fragment>
        <div className="col-md-12">
          <a className="network-sub-section">
            <div className="value">6</div>
            <div className="title">Colaboradores</div>
          </a>
          <Users />
        </div>
      </React.Fragment>
    );
  }
}

export default SubSection;
