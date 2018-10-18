import React, { Component } from "react";
import photo from "../../images/images.png";
import group from "../../images/group.png";
import local from "../../images/mappin.png";
import clip from "../../images/clip.png";
import Request from "../../request";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Popup from "./popup";

class Jumbotron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      url: '',
      media_url: '',
      tags: "random test geirinhas_preciso_que_arranges_maneira_de_as_tags_ficarem_de_maneira_direitinha_nesta_string_:3",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
    }

    this.togglemodal1 = this.togglemodal1.bind(this);
    this.togglemodal2 = this.togglemodal2.bind(this);
    this.togglemodal3 = this.togglemodal3.bind(this);
    this.togglemodal4 = this.togglemodal4.bind(this);
  }

  handleChange = ev => {
    this.setState({[ev.target.name]: ev.target.value});
  };

  handleSubmit = ev => {
    let fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("text", this.state.text);
    fd.append("url", this.state.url);
    fd.append("media_url", this.state.media_url);
    fd.append("tags", this.state.tags);
    Request.post('api/feed/article', fd);
  };

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
  togglemodal4() {
    this.setState({
      modal4: !this.state.modal4
    });
  }

  render() {
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto pb-3">
        <div className="bla d-flex flex-column ">
          <div className="d-flex flex-row">
          <div className="background-image-profile ml-3 mt-4" />
          <div className="textField mt-5">
            <input
              className="form-control z-depth-1 mt-1"
              name="title"
              onChange={this.handleChange}
              placeholder="Title"
            />
          </div>
                    </div>
          <div className="textField descrition mb-3 ">
            <textarea
              className="form-control z-depth-1 ml-5"
              id="exampleFormControlTextarea6"
              rows="3"
              name="text"
              onChange={this.handleChange}
              placeholder="Description..."
            />
          </div>
        </div>
        <div className="buttons d-flex flex-row justify-content-end mr-4 mt-3" onClick={this.togglemodal1}>
          <button type="button" className="btn-linx btn btn-light m-1">
            <img className="pr-1" src={clip} width="18" height="18" />
            Link
          {this.props.buttonLabel}
          </button>
          <Modal
            isOpen={this.state.modal1}
            toggle={this.togglemodal1}
            className={this.props.className}
          >
            <ModalHeader toggle={this.togglemodal1} />
            <ModalBody>
              {" "}
              <Popup />{" "}
            </ModalBody>
            <ModalFooter />
          </Modal>

          <button type="button" className="btn-foto btn btn-light m-1"onClick={this.togglemodal2}>
            <img className="pr-1" src={photo} width="18" height="18" />
          {this.props.buttonLabel}
          </button>
          <Modal
            isOpen={this.state.modal2}
            toggle={this.togglemodal2}
            className={this.props.className}
          >
            <ModalHeader toggle={this.togglemodal2} />
            <ModalBody>
              {" "}
              <Popup />{" "}
            </ModalBody>
            <ModalFooter />
          </Modal>

          <button type="button" className="btn-id btn btn-light m-1"onClick={this.togglemodal3}>
          <img className="pr-1" src={group} width="18" height="18" />
          Tag someone (...)
            {this.props.buttonLabel}
          </button>
          <Modal
            isOpen={this.state.modal3}
            toggle={this.togglemodal3}
            className={this.props.className}
          >
            <ModalHeader toggle={this.togglemodal3} />
            <ModalBody>
              {" "}
              <Popup />{" "}
            </ModalBody>
            <ModalFooter />
          </Modal>

          <button type="button" className="btn-local btn btn-light m-1" onClick={this.togglemodal4}>
            <img className="pr-1" src={local} width="18" height="18" />
            Location
            {this.props.buttonLabel}
          </button>
          <Modal
            isOpen={this.state.modal4}
            toggle={this.togglemodal4}
            className={this.props.className}
          >
            <ModalHeader toggle={this.togglemodal4} />
            <ModalBody>
              {" "}
              <Popup />{" "}
            </ModalBody>
            <ModalFooter />
          </Modal>

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
