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
          {/* jmmonteiro relativo à page profileNetwork colocar valor de users associado ao tipo de subSecção (ex: advisor etc) com fetch */}

          <div className="value">2</div>
          <div className="title">{this.props.title}</div>
        </a>
        <Users visible={this.props.visible} title={this.props.title} />
      </React.Fragment>
    );
  }
}

export default SubSection;
