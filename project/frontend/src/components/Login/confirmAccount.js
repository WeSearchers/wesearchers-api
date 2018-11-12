import React, { Component } from "react";
import logo from "../../images/logo-01.png";

class ConfirmAccount extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />

        <div className="container">
          <div className="confirm-account login-form d-flex flex-column justify-content-center align-content-center ">
            <div className="welcome text-white">
              <img className="mt-5" src={logo} width="194" height="100" />
            </div>
            <div className="message text-white">
              <p>
                {" "}
                To proceed you only need to consult your email address and
                <b> confirm </b>your registration.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmAccount;
