<<<<<<< HEAD
import React, { Component } from "react";
import "./App.css";
import "./userProfile.css";
import "./editUserProfileForm.css";
import SignupForm from "./components/SignupForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Validator from "./components/Validator";
import queryString from "query-string";
import UserProfile from "./views/userProfile";
import EditUserProfileForm from "./components/user-profile/editUserProfileForm";
import "bootstrap/dist/css/bootstrap.css";
=======
import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import LoginMain from './components/Login/LoginMain';
import LoginForm from './components/Login/LoginForm';
>>>>>>> master

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
<<<<<<< HEAD
            <Route path="/user/profile" component={UserProfile} />
            <Route path="/edit" component={EditUserProfileForm} />
            <Route path="/sign" component={SignupForm} />
=======
            <Route exact path="/" component={LoginMain} />
            <Route path="/LoginForm" component={LoginForm} />
>>>>>>> master
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
