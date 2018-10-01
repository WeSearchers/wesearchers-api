import React, { Component } from "react";
import Users from "./users";

class SubSection extends Component {
  state = {};

  render() {
    var displayElm = false;

    return (
      <React.Fragment>
        <a
          className="network-sub-section"
          onClick={() => this.props.turnVisible(this.props.subSection)}
        >
          <div className="value">6</div>
          <div className="title">Colaboradores</div>
        </a>
        <Users visible={this.props.visible} />
      </React.Fragment>
    );
  }
}

export default SubSection;
