import React, { Component } from "react";
import Fetch from '../../request';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPw: '',
      newPwConfirm: '',

    }
  }

  handleChange = (event) => {
    this.setState(
      {
        newPw:        event.target.id === 'pw'         ? event.target.value : this.state.newPw,
        newPwConfirm: event.target.id === "confirmPw"  ? event.target.value : this.state.newPwConfirm,
      }
    );
  }

  handleSave = (event) => {
    if (this.state.newPw === this.state.newPwConfirm) {
      //TODO
    }
    else {
      //TODO acrescentar aviso caso as passwords não dêm match
      console.log("Passwords don't match")
    }
  }

  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />
        <div className="container">
          <div className="login-form change-password">
            <div className="title">Create a new Password</div>
            {/* jmmonteiro criar nova password (ligação ao backend) */}
            <form action="/login">
              <input id="pw" onChange={this.handleChange} value={this.state.newPw} type="password" placeholder="New password" required />
              <div className="input-password">
                <input
                  id="confirmPw"
                  onChange={this.handleChange}
                  value={this.state.newPwConfirm}
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
