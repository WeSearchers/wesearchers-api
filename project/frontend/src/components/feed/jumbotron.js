import React, { Component } from "react";
import photo from "../../images/images.png";
import group from "../../images/group.png";
import local from "../../images/mapin.png";
import clip from "../../images/clip.png";
import Request from "../../request";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Popup from "./popup";
import AddPhoto from "./addphoto";
import AddURL from "./addurl";
import Tag from "./tag";
import Location from "./location";

class Jumbotron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filename: null,
      media: null,
    };
  }

  handleChange = ev => {
    if(ev.target.name === "media") {
        this.setState({["media"]: ev.target.files[0]});
        this.setState({["filename"]: ev.target.files[0].name});
    }
    else
      this.setState({[ev.target.name]: ev.target.value});
  };

  handleSubmit = ev => {
    let fd = new FormData();
    fd.append("text", this.state.text);
    fd.append("media", this.state.media, this.state.filename);
    Request.post("api/feed/publish", fd);
  };

  render() {
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto pb-3">
        <div className="bla d-flex flex-column ">
          <div className="d-flex flex-row">
          <div className="background-image-profile ml-3 mt-4" />
          </div>
          <div className="textField descrition mb-3 ">
            <textarea
              className="form-control z-depth-1 ml-5"
              id="exampleFormControlTextarea6"
              rows="3"
              name="text"
              onChange={this.handleChange}
              placeholder="Text..."
            />
          </div>
        </div>
        <div className="buttons d-flex flex-row justify-content-end mr-4 mt-3">
          <div className="btn-foto btn btn-light m-1">
          <input id="f02" type="file" accept="image/*,video/*" name="media" onChange={this.handleChange}/>
            <label for="f02"><img className="pr-1" src={photo} width="18" height="18" />
            Photo/Video
            {this.props.buttonLabel}</label>
          </div>
          <button
            type="button"
            className="btn-publish btn text-white m-1 ml-4 mt-2"
            onClick={this.handleSubmit}
          >
            Publish
          </button>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
