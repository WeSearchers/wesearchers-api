import React, { Component } from "react";

class ProfileAbout extends Component {
  state = {};
  render() {
    console.log("props", this.props);
    return (
      <React.Fragment>
        <div
          className={
            "col-md-12 " + (this.props.toShow === "about" ? "show" : "hidden")
          }
        >
          <div className="section-title">Identification</div>
          <div className="section-card identification">
            <ul>
              <li>
                {/* jmmonteiro colocar Email através do fetch */}
                <span className="label">Email</span>
                nomesobrenome@email.com
              </li>
              <li>
                {/* jmmonteiro colocar Skype através do fetch */}
                <span className="label">Skype</span>
                @nomeSobrenome1111
              </li>
            </ul>
          </div>
          <div className="section-title">Biography</div>
          <div className="section-card">
            {/* jmmonteiro colocar texto de apresentação do utilizador através do fetch */}
            <div className="sub-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque
              tincidunt scelerisque libero. Nunca dapibus tortor vel mi dapibus
              sollicitudin. Integer in sapien. Nullam at arcu a est sollicitudin
              euismod. Aenean id metus id velit ullamcorper pulvinar. Et harum
              quidem rerum facilis est et expedita distinctio. Nam quis nulla.
              Fusce aliquam vestibulum ipsum. Praesent id justo in neque
              elementum ultrices. Duis condimentum augue id magna semper rutrum.
              Et harum quidem rerum facilis est et expedita distinctio.
            </div>
          </div>
          <div className="section-title">Research interests</div>
          <div className="section-card interest-area">
            {/* jmmonteiro colocar areas de interesse do utilizador através do fetch */}
            <div className="multi-choice-area">
              <i>#</i>
              Design
            </div>
            <div className="multi-choice-area">
              <i>#</i>
              Economy
            </div>
            <div className="multi-choice-area">
              <i>#</i>
              Food
            </div>
            <div className="multi-choice-area">
              <i>#</i>
              Cience
            </div>
          </div>
          <div className="section-title">language</div>
          <div className="section-card languages">
            <div className="row">
              <div className="col-md-3 p10">
                {/* jmmonteiro colocar linguas faladas pelo utilizador através do fetch */}
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
