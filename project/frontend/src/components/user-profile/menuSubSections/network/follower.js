import React, { Component } from "react";

class Follower extends Component {
  constructor(props) {
    super(props); 
    this.state = {

    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="follower">
          <div className="photo" />
          <div className="name">{this.props.person !== undefined && this.props.person !== null ? this.props.person.first_name + " " + this.props.person.last_name : null}</div>
          <div className="orcid">{this.props.person !== undefined && this.props.person !== null ? this.props.person.orcid : null}</div>
        </div>
      </div>
    );
  }
}

export default Follower;
