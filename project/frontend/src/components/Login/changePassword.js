import React, { Component } from "react";

class ChangePassword extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />
        <div className="container">
          <div className="login-form change-password">
            <div className="title">Create a new Password</div>
            {/* jmmonteiro criar nova password (ligação ao backend) */}
            <form action="/login">
              <input type="password" placeholder="New password" required />
              <div className="input-password">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit">save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
