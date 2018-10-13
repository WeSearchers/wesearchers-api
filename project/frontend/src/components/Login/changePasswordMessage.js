import React, { Component } from "react";

class ChangePasswordMessage extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />
        <div className="container">
          <div className="activate-account login-form">
            <div className="title">
              <b>Processing...</b>
            </div>
            <div className="message">
              A password recovery request has been made. Please check your
              e-mail
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePasswordMessage;
