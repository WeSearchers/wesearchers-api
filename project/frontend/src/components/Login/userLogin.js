import React, { Component } from "react";
import Request from '../../request';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

    }
  }

  handlechange = event => {
    this.setState(
      {
        username: event.target.id === 'username' ? event.target.value : this.state.username,
        password: event.target.id === 'password' ? event.target.value : this.state.password,
      }
    );
  }

  handleLogin = event => {
    /*
    let data = {
      username: this.state.username,
      pasword: this.state.password,
    }*/
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);

    console.log(data)
    Request.post('api/user/login',data).then(
      response => {
        if (response.status === 200) {
          //login com sucesso, manda para a proxima página
        }
        else {
          //erro no login, do smth
        }
      }
    );

  }


  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form">
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

              <a href="/forgotpass" className="forgot-pass"> ? </a>
            </div>
              <button onClick={this.handleLogin} type="submit">log in</button>
            <div>Don't you have an account?</div>
            <a href="#">sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
