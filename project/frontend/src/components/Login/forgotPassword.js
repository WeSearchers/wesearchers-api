import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="forgot-password login-form">
            <div className="title">
              FORGOT <br /> YOUR PASSWORD?
            </div>
            <div className="sub-title">
              We will help you to have a new one with your email
            </div>
            <input className="input-email" type="text" placeholder="" />
            {/* jmmonteiro enviar email de recuperação de password */}
            <form action="/changePasswordMessage">
              <button type="submit" href="/user/profile">
                send email
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
