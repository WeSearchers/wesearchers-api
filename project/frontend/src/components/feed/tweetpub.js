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
import save from "../../images/icon.png";
import trash from "../../images/waste-bin.svg";

class TweetPub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      isLoading: true,
      contacts: [],
      userData: null,
      vote: props.data.vote
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
    window.open(this.props.data.url, "_blank");
  }

  vote = ev => {
    let vote = 0;
    if (ev.currentTarget.id === "upvote") {
      if (this.state.vote === 1) vote = 0;
      else vote = 1;
    } else {
      if (this.state.vote === -1) vote = 0;
      else vote = -1;
    }
    this.setState({ vote: vote });
    let fd = new FormData();
    fd.append("vote", String(vote));
    fd.append("article_id", String(this.props.data.id));
    Request.post("api/feed/vote", fd);
  };

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div className="pub1 m-5 bg-grey d-flex flex-column mr-auto ml-auto ">
        <div className="icons d-flex flex-row justify-content-end mr-4">
          <img className="mt-3" src={save} width="14" height="14" />
          <img className="mt-3 ml-3" src={trash} width="14" height="16" />
        </div>
        <div className=" d-flex flex-row align-content-baseline mb-4">
          <div className="background-image-profile ml-3 mt-3">
            {this.props.data !== null && this.props.data !== undefined ? (
              <img
                src={
                  this.props.data !== null && this.props.data !== undefined
                    ? this.props.data.profile_pic_url
                    : null
                }
                width={"100%"}
                style={{}}
              />
            ) : null}
          </div>
          <div className=" mt-4 ml-4  d-flex flex-column justify-content-center">
            <p className="font-weight-bold mb-0">
              {this.props.data !== null && this.props.data !== undefined
                ? this.props.data.name
                : "Name Surname"}
            </p>
            {/*Ze monteiro colocar nome a partir do fetch*/}
            <p className="font-weight-light mb-0">
              {/*Date and hour*/}
              {this.props.data !== undefined && this.props.data !== null
                ? this.props.data.date
                : "yyyy/mm/dd"}
            </p>
          </div>
        </div>
        <div className="content d-flex flex-row justify-content-center bg-white mr-2 ml-2 mt-4 mr-auto ml-auto">
          {this.props.data !== undefined && this.props.data !== null ? (
            <p className="font-weight-light m-2 ml-4 mr-4 mt-4 mb-4">
              {this.props.data.text}
            </p>
          ) : null}
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
        {this.props.data !== undefined &&
        this.props.data !== null &&
        this.props.data.media_url !== null ? (
          <div className="anexo d-flex flex-row justify-content-center mr-2 ml-2 mt-5 mr-auto ml-auto text-black-50">
            <img
              src={this.props.data.media_url}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : null}
        <div className="barra d-flex flex-row ml-4 mt-3">
          <div className="icons d-flex flex-row mb-4">
            <i className="fa fa-heart" />
            <p>
              {" "}
              {this.props.data !== undefined && this.props.data !== null
                ? this.props.data.fav_count
                : null}{" "}
            </p>
            <i className="fa fa-retweet" />
            <p>
              {" "}
              {this.props.data !== undefined && this.props.data !== null
                ? this.props.data.ret_count
                : null}{" "}
            </p>
          </div>
          <div className=" d-flex flex-row justify-content-end hashtags mr-4">
            {this.props.data !== undefined && this.props.data !== null
              ? this.props.data.tags
                  .splice(0, Math.min(5, this.props.data.tags.length))
                  .map(tag => (
                    <p className="bg-secondary text-white  text-center align-middle mr-1 first m-2">
                      #{tag}
                    </p>
                  ))
              : null}
            <p className="bg-blue text-white  text-center align-middles mr-1 second  m-2">
              ...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TweetPub;
