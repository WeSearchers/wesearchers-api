import React, { Component } from "react";

class ErrorPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="login-page error-page">
          <div className="container max-container">
            <div className="login-form mt-4">
              <div className="error">
                <div className="number">
                  404
                  <div className="shadow" />
                </div>

                <div className="message">
                  <div className="title">PAGE NOT FOUND</div>
                  <div className="sub-text">
                    The page you were looking for doesn't exist. <br /> You may
                    have mistyped the address or the page may have moved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ErrorPage;
