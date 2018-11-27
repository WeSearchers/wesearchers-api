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
      text: "",
      filename: null,
      media: null,
      errors: {}
    };
    this.media = React.createRef();
    this.text = React.createRef();
  }

  handleChange = ev => {
    if (ev.target.name === "media") {
      this.setState({ ["media"]: ev.target.files[0] });
      this.setState({ ["filename"]: ev.target.files[0].name });
    } else this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    let fd = new FormData();
    fd.append("text", this.state.text);
    fd.append("media", this.state.media, this.state.filename);
    Request.post("api/feed/publish", fd).then(response => {
      if (response.status === 200) {
        this.text.current.value = "";
        this.media.current.value = "";
        this.setState({
          text: "",
          filename: null,
          media: null,
          errors: {}
        });
      } else {
        response.json().then(errors => {
          this.setState({ errors: errors });
        });
      }
    });
  };

  render() {
    console.log(this.state.errors);
    return (
      <div className="container-jumb ">
        <div className="row write-pub bg-grey justify-content-between">
          <div className="col-md-2">
            <div className="background-image-profile mt-4 ml-4" />
          </div>
          <div className="col-md-9 col-sm-12 mt-4 mr-4">
            <div class="comment">
              <textarea
                class="textinput form-control"
                id="exampleFormControlTextarea6"
                rows="3"
                name="text"
                ref={this.text}
                onChange={this.handleChange}
                placeholder="Write here..."
              />
            </div>
          </div>
        </div>
        <div className="row buttons bg-grey justify-content-between ">
          <div className="col-md-3 ">
            <div className="input-jumbotron upload-btn ml-2 mb-4 mt-2">
              <input
                id="f02"
                type="file"
                ref={this.media}
                name="media"
                accept="image/*,video/*"
                onChange={this.handleChange}
              />
              <label for="f02">Upload</label>
              {this.state.errors.image !== undefined &&
              this.state.errors.image !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.image}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-3">
            <div class="comment" />
            {this.state.errors.media !== undefined &&
            this.state.errors.media !== null ? (
              <div className="wrongpass">
                <p>{this.state.errors.media}</p>
              </div>
            ) : null}
            <button
              type="button"
              className="btn-publish btn text-white m-1 mr-2 mt-3 mb-4"
              onClick={this.handleSubmit}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
