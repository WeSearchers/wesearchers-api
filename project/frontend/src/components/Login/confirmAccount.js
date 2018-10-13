import React, { Component } from "react";

class ConfirmAccount extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />

        <div className="container">
          <div className="confirm-account login-form">
            <div className="welcome">
              Welcome <b>We</b>
              Searchers!
            </div>
            <div className="message">
              To proceed you only need to consult your email address and confirm
              your registration.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmAccount;
