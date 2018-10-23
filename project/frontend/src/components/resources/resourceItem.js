import React, { Component } from "react";
import Request from "../../request"

class ResourceItem extends Component {
  constructor(props){
    super(props)
  }

  open = event => {
      window.open(this.props.data.url, "_blank");
  };

  del = event => {
      let fd = new FormData();
      fd.append("resource_id", String(this.props.data.id));
      Request.post("api/user/resource/delete", fd).then(response => {
          if (response.status === 200)
              this.props.update();
      })
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 section-card">
          <a onClick={this.del} className="delete">delete</a>
          <div className="title">{this.props.data.title}</div>
          <a onClick={this.open} className="text">{this.props.data.url}</a>
          <div className="interests">
            {/*<a className="add multi-choice-area">+</a>*/}
              {this.props.data.interests.map( interest => (
                <span key={Math.random()} className="multi-choice-area">#{interest}</span>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourceItem;
