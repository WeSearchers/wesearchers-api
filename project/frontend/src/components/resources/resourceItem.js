import React, { Component } from "react";

class ResourceItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          className={
            "col-md-12 section-card " +
            (this.props.toShow === true ? "show" : "hidden")
          }
        >
          <a className="delete">delete</a>
          <div className="title">Title</div>
          <div className="text">here is some text to entertain you...</div>
          <div className="interests">
            {/*<a className="add multi-choice-area">+</a>*/}
            {this.props.tags.map(tag => (
              <span key={Math.random()} className="multi-choice-area">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourceItem;
