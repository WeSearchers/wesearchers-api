import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <div className="background-image">
        <div className="login-page">
          <a href="/login" className="general-btn back-login" />
          <div className="container">
            <div className="forgot-password login-form">
              <div className="title">FORGOT YOUR PASSWORD?</div>
              <div className="sub-title">
                We will help you to have a new one with your email
              </div>
              <form action="/changePasswordMessage">
                <input
                  className="input-email"
                  type="text"
                  placeholder=""
                  required
                />
                {/* jmmonteiro enviar email de recuperação de password */}

                <button type="submit" href="/user/profile">
                  send email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
