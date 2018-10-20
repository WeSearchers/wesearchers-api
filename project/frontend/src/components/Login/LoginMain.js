import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LoginMain extends Component {
    render() {
        return(
            <div className="App" >
                <h1>LOGIN PAGE</h1>
                <LoginForm />                
            </div>
        )
    }
}

export default LoginMain;