import React, { Component } from "react";
import Request from "../../request";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      tags: "",
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = event => {
    let fd = new FormData();
    for (let elem in this.state)
      fd.append(elem, this.state[elem]);
    Request.post("api/user/resource", fd).then(() => {
        this.setState({
          title: "",
          url: "",
          tags: "",
        })
        this.props.update();
        this.props.toHide("hide");
    });
  };

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
          <input className="general-input" onChange={this.handleChange} name="title" type="text" placeholder="Title" value={this.state.title}/>
          <input className="general-input" onChange={this.handleChange} name="url" type="text" placeholder="Link" value={this.state.url}/>
          <input
            className="general-input"
            onChange={this.handleChange}
            name="tags"
            type="text"
            placeholder="#Hashtags"
            value={this.state.tags}
          />
          <button onClick={this.handleSubmit} className="general-btn" type="submit">
            add +
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
