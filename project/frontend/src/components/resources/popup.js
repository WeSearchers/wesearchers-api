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
            x
          </div>
          <input className="general-input" type="text" placeholder="Title" />
          <input className="general-input" type="text" placeholder="Link" />
          <input
            className="general-input"
            type="text"
            placeholder="#Hashtags"
          />
          <button className="general-btn" type="submit">
            add +
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
