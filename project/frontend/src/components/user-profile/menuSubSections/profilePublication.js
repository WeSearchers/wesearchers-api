import React, { Component } from "react";

class Publication extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-12">
        <div className="section-card publication">
          <div className="photo" />
          <div className="info">
            <div className="title-and-author">
              <div className="title">Publication title </div>
              <div className="author">Author</div>
            </div>
            <div className="text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam quis
              nulla. Aliquam ante. Nulla accumsan, elit sit amet varius semper,
              nulla mauris mollis quam, tempor suscipit diam nulla vel leo.
              Maecenas sollicitudin. Pellentesque habitant morbi tristique.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Publication;
