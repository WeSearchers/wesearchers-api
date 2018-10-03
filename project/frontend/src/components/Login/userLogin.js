import React, { Component } from "react";

class UserLogin extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form">
            <div className="logo" />
            {/* jmmonteiro colocar o que for necessário para o utilizador fazer login (ligação ao backend) */}
            {/* jmmonteiro colocar username */}
            <input type="text" placeholder="Username" />
            <div className="input-password">
              {/* jmmonteiro colocar password */}
              <input type="password" placeholder="Password" />
              <a href="/forgotpass" className="forgot-pass">
                ?
              </a>
            </div>
            {/* jmmonteiro verificar se está tudo ok ao clicar no button login */}
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
