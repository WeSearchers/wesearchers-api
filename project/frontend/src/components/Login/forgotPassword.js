import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="forgot-password login-form">
            <div className="title">FORGOT YOUR PASSWORD?</div>
            <div className="sub-title">
              We will help you to have a new one with your email
            </div>
            <input className="input-email" type="text" placeholder="email" />
            {/* jmmonteiro enviar email de recuperação de password */}

            <button type="button" href="/user/profile">
              send email
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
