import React, { Component } from "react";
import Popup from "../popup";
import Request from "../../../request";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: "hidden",
      socialMedia: ""
    };
    this.handleShowPopup = this.handleShowPopup.bind(this);
  }

  authTwitter() {
    Request.get("api/user/twitterauth").then(response => {
      response.json().then(url => {
        window.location.assign(url);
      })
    });
  }

  authReddit() {
    Request.get("api/user/redditauth").then(response => {
      response.json().then(url => {
        window.location.assign(url);
      })
    });
  }

  handleShowPopup(show, name) {
    if (this.state.showPopup !== show) {
      this.setState({
        showPopup: show,
        socialMedia: name
      });
    }
  }

  handleChangeSocialMedia = name => {
    this.setState({
      socialMedia: name
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={
            "col-md-12 " + (this.props.toShow === "about" ? "show" : "hidden")
          }
        >
          <div className="section-title">Contacts</div>
          <div className="section-card identification">
            <ul>
              <li>
                <span className="label">Email</span>
                {this.props.data.email}
              </li>
              <li>
                <span className="label">Research Unit</span>
                  {this.props.data.research_unit}
              </li>
            </ul>
          </div>
          <div className="section-title">Biography</div>
          <div className="section-card">
            <div className="sub-text">{this.props.data.bio}</div>
          </div>
          <div className="section-title">Research interests</div>
          <div className="section-card interest-area">
            {this.props.data.interests.map(interest => (
              <div key={interest} className="multi-choice-area">
                <i>#</i>
                {interest}
              </div>
            ))}
          </div>
          <div className="row col-md-12 connect-buttons-section">
              {this.props.data.reddit ?
                  <a
                      className="connect-profile-btn general-btn yellow-btn"
                  >
                      <div className="logo">
                          <i className="fa fa-check" aria-hidden="true"/>
                      </div>
                      <div className="text">connected to reddit</div>
                  </a>
                  :
            <a
              className="connect-profile-btn general-btn yellow-btn"
              onClick={this.authReddit}
            >
              <div className="logo">
                <i class="fa fa-reddit-alien" aria-hidden="true" />
              </div>
              <div className="text">connect with reddit</div>
            </a>}
              {this.props.data.twitter ?
                  <a
                      className="connect-profile-btn general-btn yellow-btn"
                  >
                      <div className="logo">
                          <i className="fa fa-check" aria-hidden="true"/>
                      </div>
                      <div className="text">connected to twitter</div>
                  </a>
                  :
                  <a
                      className="connect-profile-btn general-btn yellow-btn"
                      onClick={this.authTwitter}
                  >
                      <div className="logo">
                          <i class="fa fa-twitter" aria-hidden="true"/>
                      </div>
                      <div className="text">connect with twitter</div>
                  </a>
              }
          </div>
        </div>
        <Popup
          toShow={this.state.showPopup}
          toHide={this.handleShowPopup}
          socialMedia={this.state.socialMedia}
        />
      </React.Fragment>
    );
  }
}

export default ProfileAbout;
