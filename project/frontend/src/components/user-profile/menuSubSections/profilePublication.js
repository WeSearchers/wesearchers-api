import React, { Component } from "react";
import Post from "./publication/post";

class Publication extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          "col-md-12 " + (this.props.toShow == "posts" ? "show" : "hidden")
        }
      >
        <div className="section-title">Posts (2)</div>
        <Post />
        <Post />
        <div className="container-see-more">
          <a className="general-btn see-more">see more</a>
        </div>
        <div className="section-title">Articles (2)</div>
        <Post />
        <Post />
        <div className="container-see-more">
          <a className="general-btn see-more">see more</a>
        </div>
      </div>
    );
  }
}

export default Publication;
