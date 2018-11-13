import React, { Component } from "react";
import Request from "../../request";
import PropTypes from "prop-types";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failed: false
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handlechange = event => {
    this.setState({
      username:
        event.target.id === "username"
          ? event.target.value
          : this.state.username,
      password:
        event.target.id === "password"
          ? event.target.value
          : this.state.password
    });
  };

  handleLogin = event => {
    /*
    let data = {
      username: this.state.username,
      pasword: this.state.password,
    }*/
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);

    console.log(data);
    Request.post("api/user/login", data).then(response => {
      console.log(response);
      if (response.status === 200) {
        //Request.get('api/user/profile/0', {}).then(response => console.log(response))
        //login com sucesso, manda para a proxima página
        window.location.assign(window.location.origin + "/");
      } else {
        this.setState({ failed: true });
      }
    });
  };

  render() {
    var buttonStyle = {
      color: "#fafafa",
      maxWidth: "auto"
    };

    return (
      <div className="login-page ">
        <div className="container">
          <div className="login-form mt-4">
            <div className="logo" />
            <input
              id="username"
              value={this.state.username}
              onChange={this.handlechange}
              type="text"
              placeholder="Username"
            />

            <div className="input-password">
              <input
                id="password"
                value={this.state.password}
                onChange={this.handlechange}
                type="password"
                placeholder="Password"
              />
              {this.state.failed ? (
                <div className="wrongpass">
                  <p>Unknown username/password combination</p>
                </div>
              ) : null}

              <a href="/forgotpass" className="forgot-pass">
                {" "}
                ?{" "}
              </a>
            </div>
            <button onClick={this.handleLogin} type="submit">
              log in
            </button>
            <div className="dont-have-account mb-3">
              <div>Don't you have an account?</div>
              <a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
