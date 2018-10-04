import React, { Component } from "react";

class ChangePassword extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form change-password">
            <div className="title">Create a new Password</div>
            {/* jmmonteiro criar nova password (ligação ao backend) */}
            <input type="password" placeholder="New password" />
            <div className="input-password">
              <input type="password" placeholder="Confirm Password" />
            </div>
            <form action="/login">
              <button type="submit">save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
