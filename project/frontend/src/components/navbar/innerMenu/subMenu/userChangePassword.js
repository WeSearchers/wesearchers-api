import React, { Component } from "react";

class UserChangePassword extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <form
          className={
            "form-change-password " +
            (this.props.toShow === "changepassword" ? "show" : "hidden")
          }
          action=""
        >
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="Old password"
              name="old_password"
              required
            />
          </div>
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="New password"
              name="new_password1"
              required
            />
          </div>
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="Confirm new password"
              name="new_password2"
              required
            />
          </div>
          <input
            className="general-btn yellow-btn"
            type="submit"
            value="save"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default UserChangePassword;
