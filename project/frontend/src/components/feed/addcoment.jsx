import React, { Component } from "react";

class AddComent extends Component {
  render() {
    return (
      <div className=" d-flex flex-column mr-auto ml-auto ">
        <div className="boder-radius-xs bg-dark d-flex flex-row  align-items-center mt-5 p-3">
          <div className="background-image-profile mr-5" />
          <div className=" d-flex flex-row justify-content-center align-items-center ">
            <textarea
              class="form-control-coment form-coment z-depth-1"
              id="exampleFormControlTextarea6"
              rows="2"
              placeholder="Add new coment..."
            />
          </div>
        </div>
        <div className=" boder-radius-xs bg-grey d-flex flex-row  mt-5 p-4">
          <div className="background-image-profile" />
          <div className=" d-flex flex-column justify-content-center align-self-end  boder-radius-sm ml-5 p-3">
            <h3 className="font-weight-regular ">Name</h3>
            <p className="font-weight-light ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco labori
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddComent;
