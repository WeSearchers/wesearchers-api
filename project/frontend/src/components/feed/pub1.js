import React, { Component } from "react";
import uparrow from "../../images/up-arrow.png";
import downarrow from "../../images/down-arrow.png";
import share from "../../images/share.png";
import balloon from "../../images/balloon.png";
import Popup from "./popup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import fb from "../../images/facebook-logo-button.png";
import google from "../../images/google-plus-logo-button.png";
import linkedin from "../../images/linkedin-logo-button.png";
import twitter from "../../images/twitter-logo-button.png";
import AddComent from "./addcoment";

class Pub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      isLoading: true,
      contacts: []
    };

    this.togglemodal1 = this.togglemodal1.bind(this);
    this.togglemodal2 = this.togglemodal2.bind(this);
    this.seeMore = this.seeMore.bind(this);
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
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://randomuser.me/api/?results=1&nat=us,dk,fr,gb")
      .then(response => response.json())
      .then(parseJSON =>
        parseJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          gender: `${user.gender}`
        }))
      )
      .then(contacts =>
        this.setState({
          contacts,
          isLoading: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  seeMore() {
      console.log(this.props.data.url);
      window.open(this.props.data.url, '_blank');
  }

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div className="pub1 bg-grey m-5 d-flex flex-column mr-auto ml-auto ">
        <div className=" d-flex flex-row align-content-baseline">
          <div className="background-image-profile ml-3 mt-3" />
          <div className=" mt-4 ml-4  d-flex flex-column justify-content-center">
            <p className="font-weight-bold mb-0">
              {"Name Surname"/*por favor alguem me acrescente os campos first_name e last_name ao request quando se pedem artigos, thx*/}
            </p>
            { /*Ze monteiro colocar nome a partir do fetch*/}
            <p className="font-weight-light mb-0">{/*Date and hour*/}{this.props.data !== undefined && this.props.data !== null ? this.props.data.date : "yyyy/mm/dd"}</p>
          </div>
        </div>
        <div className="content d-flex flex-row justify-content-center bg-white mr-2 ml-2 mt-4 mr-auto ml-auto">
          <p className="font-weight-light m-2 ml-4 mr-4 mt-4 mb-4">
            {
              this.props.data !== undefined && this.props.data !== null ?
                this.props.data.text
                :
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim (...)"
            }
          </p>
        </div>
        <div className="pub-btn d-flex flex-row justify-content-end ">
          <button
            type="button"
            className="btn-seemore text-white btn btn-secondary m-1 mr-4 mt-3"
            onClick={this.seeMore}
          >
            See more
          </button>
        </div>
          {
            this.props.data !== undefined && this.props.data !== null && this.props.data.media_url !== null? (
                <div className="anexo d-flex flex-row justify-content-center mr-2 ml-2 mt-5 mr-auto ml-auto text-black-50">
                    <img src={this.props.data.media_url} style={{width: "100%", height: "100%"}}/>
                </div>
                )
            : null
          }
        <div className="barra d-flex flex-row ml-4 mt-3">
          <div className="icons d-flex flex-row mb-4">
            <img
              className="mr-1 ml-3 mt-1"
              src={uparrow}
              width="18"
              height="18"
            />
            <p className=" mt-1">{this.props.data !== undefined && this.props.data !== null ? this.props.data.score : "Score"}</p>
            <img
              className="ml-2 mt-2 opacity"
              src={downarrow}
              width="18"
              height="18"
            />

            <button className="img-btn " onClick={this.togglemodal2}>
              <img className="opacity" src={share} width="14" height="14" />
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

            <button className="img-btn" onClick={this.togglemodal1}>
              <img className="opacity" src={balloon} width="14" height="14" />
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
                <AddComent />{" "}
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

export default Pub1;
