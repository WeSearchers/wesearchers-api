import React, { Component } from "react";
import arrow from "../images/up-arrow.png";
import share from "../images/share.png";
import balloon from "../images/balloon.png";

class AddComent extends Component {
  render() {
    return (
      <div className="write-coment bg-grey2 m-5 d-flex flex-column mr-auto ml-auto ">
        <div className="bla d-flex flex-row align-content-baseline">
          <div className="background-image-profile ml-3 mt-4" />
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <textarea
              class="form-control z-depth-1"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Add new comment..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddComent;
