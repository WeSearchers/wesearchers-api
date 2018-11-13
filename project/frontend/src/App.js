import React, { Component } from "react";
import "./App.css";
import "./styles/userProfile.css";
import "./styles/editUserProfileForm.css";
import "./styles/loginSignForm.css";
import "./styles/innerMenu.css";
import "./styles/resources.css";
import "./styles/navbar.css";
import "./styles/errorPage.css";
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
import UserRegister from "./components/Login/userRegister";
import ErrorPage from "./views/errorPage";
import SettingsAndPrivacy from "./components/navbar/innerMenu/sideMenu/settingsAndPrivacy";

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
                <Route exact path="/user/settings" component={InnerMenuMain} />
                <Route exact path="/user/resources" component={ResourcesMain} />
                <Route exact path="/user/edit" component={EditUserProfileForm} />
                <Route exact path="/changepassword" component={ChangePassword} />
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/" component={Feed} />
                <Route component={ErrorPage}/>
              </Switch>
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/resetpw" component={ResetPassword} />
                <Route exact path="/register/success" component={ConfirmAccount} />
                <Route exact path="/register" component={LoginSignUp} />
                <Route exact
                  path="/changepasswordmessage"
                  component={changePasswordMessage}
                />
                <Route exact path="/confirm" component={ConfirmAccount} />
                <Route exact path="/forgotpass" component={ForgotPassword} />
                <Route exact path="/activate" component={ActivateAccount} />
                <Route exact path="/" component={UserLogin} />
                <Route component={ErrorPage}/>
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
