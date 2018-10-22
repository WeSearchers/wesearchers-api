import React, { Component } from "react";

class ResourceItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 section-card">
          <a className="delete">delete</a>
          <div className="title">Title</div>
          <div className="text">here is some text to entertain you...</div>
          <div className="interests">
            {/*<a className="add multi-choice-area">+</a>*/}

            <span className="multi-choice-area">#interest</span>

            <span className="multi-choice-area">#interest</span>

            <span className="multi-choice-area">#interest</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourceItem;
