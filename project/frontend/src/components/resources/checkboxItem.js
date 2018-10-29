import React, { Component } from "react";

class CheckboxItem extends Component {
  constructor(props) {
    super(props)
  }
  
  handleClick = event => {
    this.props.toFilter(this.props.label, event.target.checked);
  }

  render() {
    return (
      <React.Fragment>
        <div className="checkbox">
          <input
            className="regular-checkbox"
            type="checkbox"
            name="tag"
            checked={this.props.value}
            onChange={this.handleClick}
          />{" "}
          <div className="checkbox-label">#{this.props.label}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxItem;
