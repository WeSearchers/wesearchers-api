import React, { Component } from "react";

class ResourceItem extends Component {
  constructor(props){
    super(props)
  }

  open = event => {
      window.open(this.props.data.url, "_blank");
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 section-card">
          <a onClick={this.props.delete} className="delete">delete</a>
          <div className="title">{this.props.data.title}</div>
          <a onClick={this.open} className="text">{this.props.data.url}</a>
          <div className="interests">
            {/*<a className="add multi-choice-area">+</a>*/}
              {this.props.data.interests.map( interest => (
                <span className="multi-choice-area">#{interest}</span>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourceItem;
