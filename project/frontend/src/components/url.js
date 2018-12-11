import React, { Component } from "react";

class Url extends Component {
  state = {};
  render() {
    return (
      <div className="url d-flex flex-column justify-content-center align-items-center ">
        <div className="container max-container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="welcome">
              <h1> 404 </h1>
              <p> PAGE NOT FOUND</p>
            </div>
            <div className="message text-white">
              <p>The page you were looking for doesn´t exist.</p>
              <p>
                You may have mistyped the adress or the page may have moved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Url;
