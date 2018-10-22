import React, { Component } from "react";
import "./App.css";
import "./styles/userProfile.css";
import "./styles/editUserProfileForm.css";
import "./styles/loginSignForm.css";
import "./styles/innerMenu.css";
import "./styles/resources.css";
import "./styles/navbar.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfileMain from "./components/user-profile/userProfileMain";
import EditUserProfileForm from "./components/user-profile/editUserProfileForm";
import UserLogin from "./components/Login/userLogin";
import ForgotPassword from "./components/Login/forgotPassword";
import ConfirmAccount from "./components/Login/confirmAccount";
import ActivateAccount from "./components/Login/activateAccount";
import ChangePassword from "./components/Login/changePassword";
import changePasswordMessage from "./components/Login/changePasswordMessage";
import "bootstrap/dist/css/bootstrap.css";
import LoginSignUp from "./components/Login/LoginSignUp";
import Feed from "./views/feed";
import Request from "./request";
import ResetPassword from "./components/Login/resetPassword";
import InnerMenuMain from "./components/navbar/innerMenu/innerMenuMain";
import ResourcesMain from "./components/resources/resourcesMain";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      logedin: false
    };
  }

  render() {
    if (this.state.ready) {
      if (this.state.logedin) {
        return (
          <Router>
            <div className="App">
              <Switch>
                <Route path="/user/profile" component={UserProfileMain} />
                <Route path="/user/settings" component={InnerMenuMain} />
                <Route path="/user/resources" component={ResourcesMain} />
                <Route path="/user/edit" component={EditUserProfileForm} />
                <Route path="/changepassword" component={ChangePassword} />
                <Route path="/feed" component={Feed} />
                <Route exact path="/" component={Feed} />
              </Switch>
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div className="App">
              <Switch>
                <Route path="/resetpw" component={ResetPassword} />
                <Route path="/register/success" component={ConfirmAccount} />
                <Route path="/register" component={LoginSignUp} />
                <Route
                  path="/changepasswordmessage"
                  component={changePasswordMessage}
                />
                <Route path="/confirm" component={ConfirmAccount} />
                <Route path="/forgotpass" component={ForgotPassword} />
                <Route path="/activate" component={ActivateAccount} />
                <Route component={UserLogin} />
              </Switch>
            </div>
          </Router>
        );
      }
    } else return <div className="App" />;
  }

  componentDidMount() {
    Request.get("api/user/logincheck").then(response => {
      this.setState({
        ready: true,
        logedin: response.status === 200
      });
    });
  }
}

export default App;
