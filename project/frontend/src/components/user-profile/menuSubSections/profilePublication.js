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
        <div className="section-title">
          Posts <span>(2)</span>
        </div>
        <div className="container-posts">
          <Post />
          <Post />
        </div>

        <div className="container-see-more">
          <a className="general-btn see-more">see more</a>
        </div>
        <div className="section-title">
          Articles <span>(5)</span>
        </div>
        <div className="container-posts">
          <Post />
          <Post />
        </div>
        <div className="container-see-more">
          <a className="general-btn see-more">see more</a>
        </div>
      </div>
    );
  }
}

export default Publication;
