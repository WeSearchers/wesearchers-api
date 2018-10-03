import React, { Component } from "react";

class ActivateAccount extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="activate-account login-form">
            <div className="title">
              <b>All set!</b>
            </div>
            <div className="message">
              Your account has been activated. To see your profile click{" "}
              <a href="/user/profile">go.</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
