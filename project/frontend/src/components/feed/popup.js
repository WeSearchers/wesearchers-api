import React, { Component } from "react";

import fb from "../../images/facebook-logo-button.png";
import google from "../../images/google-plus-logo-button.png";
import linkedin from "../../images/linkedin-logo-button.png";
import twitter from "../../images/twitter-logo-button.png";

class Popup extends React.Component {
  render() {
    return (
      <div className="  m-2 d-flex flex-column  ">
        <div className=" mt-4 mr-auto ml-auto  d-flex flex-column justify-content-center">
          <h4 className="font-weight-bold">
            Like this post? Share with the world
          </h4>
          <p className="font-weight-light mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod
          </p>
        </div>
        <div className=" d-flex flex-row justify-content-center mb-4">
          <img
            className="mr-2 ml-4 mt-1 opacity"
            src={fb}
            width="48"
            height="48"
          />

          <img
            className="mr-2 ml-4 mt-1 opacity"
            src={google}
            width="48"
            height="48"
          />
          <img
            className="mr-2 ml-4 mt-1 opacity"
            src={linkedin}
            width="48"
            height="48"
          />
          <img
            className="mr-2 ml-4 mt-1 opacity"
            src={twitter}
            width="48"
            height="48"
          />
        </div>
      </div>
    );
  }
}

export default Popup;
