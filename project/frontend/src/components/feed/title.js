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
      title: "",
      text: "",
      url: "",
      media_url: "",
      tags:
        "random test geirinhas_preciso_que_arranges_maneira_de_as_tags_ficarem_de_maneira_direitinha_nesta_string_:3",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false
    };
    this.togglemodal4 = this.togglemodal4.bind(this);
    this.togglemodal1 = this.togglemodal1.bind(this);
    this.togglemodal2 = this.togglemodal2.bind(this);
    this.togglemodal3 = this.togglemodal3.bind(this);
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    let fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("text", this.state.text);
    fd.append("url", this.state.url);
    fd.append("media_url", this.state.media_url);
    fd.append("tags", this.state.tags);
    Request.post("api/feed/article", fd);
  };

  togglemodal4() {
    this.setState({
      modal1: !this.state.modal4
    });
  }

  togglemodal1() {
    this.setState({
      modal1: !this.state.modal1
    });
  }
  togglemodal2() {
    this.setState({
      modal2: !this.state.modal2
    });
  }
  togglemodal3() {
    this.setState({
      modal3: !this.state.modal3
    });
  }

  render() {
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto pb-3" />
    );
  }
}

export default Jumbotron;
