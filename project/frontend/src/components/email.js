import React, { Component } from "react";

class Email extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container-email">
          <div className="header">
            <div className="logo" />
          </div>
          <div className="main">
            <div className="text">
              <div className="title">Confirm your email!</div>
              <div className="sub-text">
                Hey user123, <br /> we received a request to set your
                WeSearchers email to user123@email.wohoo. If this is correct,
                please confirm by clicking the button below.
              </div>
            </div>
            <button>confirm</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Email;
