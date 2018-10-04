import React, { Component } from "react";

class Follower extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-12">
        <div className="follower">
          <div className="photo" />
          <div className="name">Name follower</div>
          <div className="orcid">(orcid)</div>
        </div>
      </div>
    );
  }
}

export default Follower;
