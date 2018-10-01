import React, { Component } from "react";
import "./App.css";
import "./userProfile.css";
import SignupForm from "./components/SignupForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Validator from "./components/Validator";
import queryString from "query-string";
import UserProfile from "./views/userProfile";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/user/profile" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
