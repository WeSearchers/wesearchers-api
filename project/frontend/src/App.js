import React, { Component } from "react";
import "./App.css";
import "./styles/userProfile.css";
import "./styles/editUserProfileForm.css";
import "./styles/loginSignForm.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./views/userProfile";
import EditUserProfileForm from "./components/user-profile/editUserProfileForm";
import UserLogin from "./components/Login/userLogin";
import ForgotPassword from "./components/Login/forgotPassword";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/user/profile" component={UserProfile} />
            <Route path="/edit" component={EditUserProfileForm} />
            <Route path="/login" component={UserLogin} />
            <Route path="/forgotpass" component={ForgotPassword} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
