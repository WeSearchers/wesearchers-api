import React, { Component } from "react";

class ProfileAbout extends Component {
  state = {};
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
              {/*
              <li>
                <span className="label">Skype</span>
                Não existe em BD
              </li>
              */}
              </ul>
          </div>
          <div className="section-title">Biography</div>
          <div className="section-card">
            <div className="sub-text">
              {this.props.data.bio}
            </div>
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
          <div className="section-title">language</div>
          <div className="section-card languages">
            <div className="row">
              <div className="col-md-3 p10">
                {/* jmmonteiro colocar linguas faladas pelo utilizador através do fetch  */}
                {/* FALTA NA BD */}
                <div className="language">Portuguese</div>
              </div>
              <div className="col-md-3 p10">
                <div className="language">English</div>
              </div>
              <div className="col-md-3 p10">
                <div className="language">Spanish</div>
              </div>
              <div className="col-md-3 p10">
                <div className="language">Germany</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileAbout;
