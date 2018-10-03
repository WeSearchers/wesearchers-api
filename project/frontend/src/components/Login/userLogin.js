import React, { Component } from "react";

class UserLogin extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form">
            <div className="logo" />
            <input type="text" placeholder="Username" />
            <div className="input-password">
              <input type="password" placeholder="Password" />
              <a href="/forgotpass" className="forgot-pass">
                ?
              </a>
            </div>
            <button type="button" href="/user/profile">
              log in
            </button>
            <div>Don't you have an account?</div>
            <a href="#">sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
