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
          <div className="photo">
            <img src={"data:image/jpeg;base64, " + this.props.person.image_data} width={"100%"} style={{"clip-path": "circle(50% at center)"}}/>
          </div>
          <div className="name">{this.props.person !== undefined && this.props.person !== null ? this.props.person.first_name + " " + this.props.person.last_name : null}</div>
          <div className="orcid">{this.props.person !== undefined && this.props.person !== null ? this.props.person.orcid : null}</div>
        </div>
      </div>
    );
  }
}

export default Follower;
