import React, { Component } from "react";
import arrow from "../../images/up-arrow.png";
import share from "../../images/share.png";
import balloon from "../../images/balloon.png";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import fb from "../../images/facebook-logo-button.png";
import google from "../../images/google-plus-logo-button.png";
import linkedin from "../../images/linkedin-logo-button.png";
import twitter from "../../images/twitter-logo-button.png";

class Pub2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="pub2 bg-grey m-5 d-flex flex-column mr-auto ml-auto ">
        <div className=" d-flex flex-row align-content-baseline">
          <div className="background-image-profile ml-3 mt-3" />
          <div className=" mt-4 ml-4  d-flex flex-column justify-content-center">
            <p className="font-weight-bold mb-0">Nome Sobrenome</p>
            <p className="font-weight-light mb-0">Data e hora</p>
          </div>
        </div>
        <div className="content d-flex flex-row justify-content-center bg-white mr-2 ml-2 mt-4 mr-auto ml-auto">
          <p className="font-weight-light m-2 ml-4 mr-4 mt-4 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim (...)
          </p>
        </div>
        <div className="pub-btn d-flex flex-row justify-content-end ">
          <button
            type="button"
            class="btn-seemore text-white btn btn-secondary m-1 mr-4 mt-3"
          >
            See more
          </button>
        </div>
        <div className="barra d-flex flex-row ml-4 mt-3">
          <div className="icons d-flex flex-row mb-4">
            <img
              className="mr-1 ml-3 mt-1"
              src={arrow}
              width="18"
              height="18"
            />
            <p className=" mt-1">600</p>
            <img
              className="mr-2 mt-1 opacity"
              src={arrow}
              width="18"
              height="18"
            />
            <button className="img-btn " onClick={this.toggle}>
              <img className="opacity" src={share} width="14" height="14" />
              {this.props.buttonLabel}
            </button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle} />
              <ModalBody> sbsdjhefhe </ModalBody>
              <ModalFooter />
            </Modal>

            <button className="img-btn" onClick={this.toggle}>
              <img className="opacity" src={balloon} width="14" height="14" />
              {this.props.buttonLabel}
            </button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle} />
              <ModalBody>
                <div className="background-image-profile mr-5" />
                <textarea
                  class="form-control-coment form-coment z-depth-1"
                  id="exampleFormControlTextarea6"
                  rows="3"
                  placeholder="Add new coment..."
                />
              </ModalBody>
              <ModalFooter />
            </Modal>
          </div>
          <div className=" d-flex flex-row justify-content-end hashtags mr-4">
            <p className="bg-secondary text-white text-center align-middle mr-1  first m-2">
              #LoremIpsu
            </p>
            <p className="bg-secondary text-white  text-center align-middle mr-1 first m-2">
              #LoremIpsu
            </p>
            <p className="bg-secondary text-white  text-center align-middle mr-1 first m-2">
              #LoremIpsu
            </p>
            <p className="bg-secondary text-white  text-center align-middles mr-1 second  m-2">
              ...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Pub2;
