import React, { Component } from "react";

class CheckboxItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="checkbox">
          <input
            type="checkbox"
            name="tag"
            value={this.props.label}
            onClick={() => this.props.toFilter(this.props.id - 1)}
          />{" "}
          <div className="checkbox-label">#{this.props.label}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxItem;
