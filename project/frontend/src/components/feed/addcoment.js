import React, { Component } from "react";

class AddComent extends Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center ">
        <div className="newcoment d-flex flex-column pb-2 pt-3 mb-4 bg-grey boder-radius-sm">
          <div className="d-flex">
            <div className="background-image-profile ml-3" />
            <textarea
              class="form-control-coment z-depth-1 ml-4 mr-3"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Add new coment..."
            />
          </div>
          <div className="d-flex flex-row justify-content-end mb-2 popbtn">
            {" "}
            <button
              type="button"
              class="btn btn-publish text-white bg-dark p-2 mr-4 mt-3 boder-radius-sm"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="lastcoments d-flex mb-4 pt-4 bg-light boder-radius-sm">
          <div className="">
            <div className="background-image-profile mr-4 ml-3" />
          </div>
          <div className="d-flex flex-column">
            <h2>Name Surname</h2>
            <p className="font-weight-light mr-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
              consectetur
            </p>
          </div>
        </div>
        <div className="lastcoments d-flex  mb-4 pt-4 bg-light boder-radius-sm">
          <div className="">
            <div className="background-image-profile mr-4 ml-3" />
          </div>
          <div className="d-flex flex-column">
            <h2>Name Surname</h2>
            <p className="font-weight-light mr-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
              consectetur
            </p>
          </div>
        </div>
        <div className="lastcoments d-flex  mb-4 pt-4 bg-light boder-radius-sm">
          <div className="">
            <div className="background-image-profile mr-4 ml-3" />
          </div>
          <div className="d-flex flex-column">
            <h2>Name Surname</h2>
            <p className="font-weight-light mr-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
              consectetur
            </p>
          </div>
        </div>
        <div className="lastcoments d-flex  mb-4s pt-4 bg-light boder-radius-sm">
          <div className="">
            <div className="background-image-profile mr-4 ml-3" />
          </div>
          <div className="d-flex flex-column">
            <h2>Name Surname</h2>
            <p className="font-weight-light mr-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
              consectetur
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddComent;
