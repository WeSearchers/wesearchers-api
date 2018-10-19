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
import Request from "../../request";
import save from '../../images/icon.png';
import trash from '../../images/waste-bin.png';

class Pub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal1: false,
        modal2: false,
        isLoading: true,
        contacts: [],
        userData: null,
        vote: props.data.vote,
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

  seeMore() {
      window.open(this.props.data.url, '_blank');
  }

  vote = ev => {
    let vote = 0;
    if(ev.currentTarget.id === "upvote") {
        if (this.state.vote === 1)
          vote = 0;
        else
          vote = 1;
    }
    else {
        if (this.state.vote === -1)
          vote = 0;
        else
          vote = -1;
    }
    this.setState({vote: vote});
    let fd = new FormData();
    fd.append("vote", String(vote));
    fd.append("article_id", String(this.props.data.id));
    Request.post("api/feed/vote", fd);
  };

  componentDidMount() {
    console.log(this.props.data);
    Request.get("api/user/profile/" + this.props.data.user_id).then(response => {
      response.json().then(userData => {
        this.setState({userData : userData});
      })
    })
  }

  render() {

    const { isLoading, contacts } = this.state;
    return (
      <div className="pub1 m-5 bg-grey d-flex flex-column mr-auto ml-auto ">
      <div className="icons d-flex flex-row justify-content-end mr-4">
      <img  className="mt-3"src={save} width="14" height="14" />
      <img  className="mt-3 ml-3"src={trash} width="14" height="16" />
      </div>
        <div className=" d-flex flex-row align-content-baseline mb-4">
          <div className="background-image-profile ml-3 mt-3" >
              {this.state.userData !== null ?
                <img src={"data:image/jpeg;base64, " + this.state.userData.image_data} width={"100%"} style={{"clip-path": "circle(50% at center)"}}/> : null
              }
          </div>
          <div className=" mt-4 ml-4 d-flex flex-column justify-content-center">
            <p className="font-weight-bold mb-0">
              {this.state.userData !== null ?
                  this.state.userData.first_name + " " + this.state.userData.last_name : "Name Surname"}
            </p>
            { /*Ze monteiro colocar nome a partir do fetch*/}
            <p className="font-weight-light mb-0">{/*Date and hour*/}{this.props.data !== undefined && this.props.data !== null ? this.props.data.date : "yyyy/mm/dd"}</p>
          </div>
        </div>
        <div className="content d-flex flex-row justify-content-center bg-white mr-2 ml-2 mt-4 mr-auto ml-auto">

            {
              this.props.data !== undefined && this.props.data !== null ? (
                <p className="font-weight-light m-2 ml-4 mr-4 mt-4 mb-4">
                  <strong>{this.props.data.title}</strong><br/>{this.props.data.text}
                </p>
                )
                : null
            }
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
                    <img src={this.props.data.media_url} style={{width: "100%", height: "auto"}}/>
                </div>
                )
            : null
          }
        <div className="barra d-flex flex-row ml-4 mt-3">
          <div className="icons d-flex flex-row mb-4">
            <img
              className={"mr-2 ml-3 mt-1" + (this.state.vote === 1 ? "" : " opacity")}
              src={uparrow}
              width="18"
              height="20"
              id="upvote"
              onClick={this.vote}
            />
            <p className=" mt-1">{this.props.data !== undefined && this.props.data !== null ? this.props.data.base_score + this.state.vote : "Score"}</p>
            <img
              className={"ml-2 mt-2" + (this.state.vote === -1 ? "" : " opacity")}
              src={downarrow}
              width="18"
              height="20"
              id="downvote"
              onClick={this.vote}
            />

            <button className="img-btn ml-3" onClick={this.togglemodal2}>
              <img  src={share} width="20" height="22" />
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
              <img  src={balloon} width="20" height="16" />
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
                <AddComent id={this.props.data.id}/>{" "}
              </ModalBody>
              <ModalFooter />
            </Modal>
          </div>
          <div className=" d-flex flex-row justify-content-end hashtags mr-4">
            {this.props.data !== undefined && this.props.data !== null ? this.props.data.interests.map(interest => (
              <p className="bg-secondary text-white  text-center align-middle mr-1 first m-2">
                #{interest}
              </p>
            )) : null
            }
            <p className="bg-blue text-white  text-center align-middles mr-1 second  m-2">
              ...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Pub1;
