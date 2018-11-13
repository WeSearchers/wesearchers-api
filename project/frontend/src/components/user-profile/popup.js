import React, { Component } from "react";

class Popup extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          "resources-popup-container " +
          (this.props.toShow === "show" ? "show" : "hidden")
        }
      >
        <div className="container resources-popup section-card">
          <div onClick={() => this.props.toHide("hide")} className="close">
            <i className="fa fa-window-close" aria-hidden="true" />
          </div>
          <div className="title">
            <div className="logo">
              {" "}
              <i
                className={
                  "fa " +
                  (this.props.socialMedia === "twitter"
                    ? "fa-twitter"
                    : "fa-reddit-alien")
                }
                aria-hidden="true"
              />{" "}
            </div>
            Connect with {this.props.socialMedia}
          </div>
          <input
            className="general-input"
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            className="general-input"
            onChange={this.handleChange}
            name="password"
            type="text"
            placeholder="Password"
            value={this.state.url}
          />
          <button
            onClick={this.handleSubmit}
            className="general-btn yellow-btn"
            type="submit"
          >
            connect
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
