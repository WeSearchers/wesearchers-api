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
      errors:{}
    };
    this.media = React.createRef();
    this.text = React.createRef();
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
    Request.post("api/feed/publish", fd).then(response => {
      if (response.status === 200){
        this.text.value = "";
        this.media.value = "";
        this.setState({
          text: '',
          filename: null,
          media: null,
          errors:{}
        });
      }
      else {
        response.json().then(errors => {
          this.setState({errors: errors})
        })
      }
    });
  };

  render() {
    console.log(this.state.errors);
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto pb-3">
        <div className="bla d-flex flex-column ">
          <div className="d-flex flex-row align-content-baseline mb-4">
          <div className="background-image-profile ml-3 mt-4" />
              {/*{this.props.userData !== null && this.props.userData !== undefined ? (
            <img
                  className="circle"
                  src={
                    "data:image/jpeg;base64, " + this.props.userData.image_data
                  }
                  width={"100%"}
                  style={{}}
                />
                ) : null}*/
              }
          </div>
          <div className="textField descrition mb-3 ">
            <textarea
              className="form-control z-depth-1 ml-5"
              id="exampleFormControlTextarea6"
              rows="3"
              name="text"
              ref={this.text}
              onChange={this.handleChange}
              placeholder="Text..."
            />
          </div>
          {this.state.errors.text !== undefined &&
                this.state.errors.text !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.text}</p>
                  </div>
                ) : null}
        </div>
        <div className="buttons d-flex flex-row justify-content-end mr-4 mt-3">
          <div className="btn-foto btn btn-light m-1">
          <input id="f02" type="file" accept="image/*,video/*" name="media" ref={this.media} onChange={this.handleChange}/>
            <label for="f02"><img className="pr-1" src={photo} width="18" height="18" />
            Photo/Video
            {this.props.buttonLabel}</label>
            {this.state.errors.media !== undefined &&
                this.state.errors.media !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.media}</p>
                  </div>
                ) : null}
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
