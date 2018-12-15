import React, { Component } from "react";
import Request from "../../request";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let fd = new FormData();
    fd.append("email", this.state.email);
    Request.post("api/user/resetpw", fd).then(response => {
      if (response.status === 200)
        window.location.assign(
          window.location.origin + "/changepasswordmessage"
        );
    });
  };

  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />
        <div className="container">
          <div className="forgot-password login-form">
            <div className="title">Forgot your password?</div>
            <div className="sub-title">
              We will help you to have a new one with your email
            </div>
            <form onSubmit={this.handleSubmit}>
              <input
                className="input-email"
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                required
              />

              <input className="mb-4" type="submit" value="send email" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
