import React, { Component } from "react";
import Request from "../../request";

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      activated: false
    };
  }

  activate = event => {
    let query = new URLSearchParams(window.location.search);
    let fd = new FormData();
    fd.append("guid", query.get("guid"));
    Request.post("api/user/validate", fd).then(response => {
      let activated = response.status === 200;
      this.setState({ answered: true, activated: activated });
    });
  };

  componentDidMount() {
    this.activate();
  }

  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="activate-account login-form">
            {this.state.answered ? (
              this.state.activated ? (
                <div>
                  <div className="title text-white">
                    <b>All set!</b>
                  </div>
                  <div className="message text-white">
                    Your account has been activated. To login click{" "}
                    <a href="/login">here</a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="title text-white">
                    <b>Oops!</b>
                  </div>
                  <div className="message text-white">
                    Something went wrong, this page is not available. To login
                    click <a href="/login">here</a>
                  </div>
                </div>
              )
            ) : (
              <div>
                <div className="title text-white">
                  <b>Activating...</b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
