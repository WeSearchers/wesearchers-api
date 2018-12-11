import React, { Component } from "react";
import Request from "../../request";

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      bio: "",
      image: "",
      image_data: null,
      errors: {}
    };
  }

  static isnumeric(str) {
    for (let i = 0; i < str.length; i++) {
      if ("1234567890-".indexOf(str[i]) < 0) return false;
    }
    return true;
  }

  static format_orcid(value) {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join("-");
    } else {
      return value;
    }
  }

  static hashTagify(value, oldValue) {
    let str = value.replace(/#/g, "");
    let parts = str.split(" ");
    parts = parts.filter(el => {
      return el !== "";
    });
    if (
      oldValue.length < value.length &&
      (value.endsWith(" ") || value.endsWith("#"))
    )
      parts.push("");
    return "#" + parts.join(" #");
  }

  handlechange = event => {
    if (event.target.name === "orcid") {
      event.target.value = LoginSignUp.format_orcid(event.target.value);
      if (!LoginSignUp.isnumeric(event.target.value)) event.target.value = "";
      this.setState({ orcid: event.target.value.split("-").join("") });
    } else if (event.target.name === "interests") {
      event.target.value = LoginSignUp.hashTagify(
        event.target.value,
        this.state.interests
      );
      this.setState({
        [event.target.name]: event.target.value
      });
    } else if (event.target.type === "file") {
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.onload = e => {
        this.setState({ image_data: reader.result });
      };
      reader.readAsDataURL(file);

      this.setState({
        [event.target.name]: event.target.files[0]
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    console.log(this.state);
  };

  handleRegister = event => {
    /**FAZER CONFIRMAÇÕES E CENAS */
    let data = new FormData();

    for (let elem in this.state) {
      if (elem !== "image_data" && elem !== "errors") {
        if (elem === "interests")
          data.append(elem, this.state[elem].replace(/#/g, ""));
        else if (this.state[elem].filename !== undefined)
          data.append(elem, this.state[elem], this.state[elem].filename);
        else data.append(elem, this.state[elem]);
      }
    }

    Request.post("api/user/register", data).then(response => {
      if (response.status === 200) {
        window.location.assign(window.location.origin + "/register/success");
      } else {
        response.json().then(errors => {
          this.setState({ errors: errors });
        });
      }
    });
  };

  render() {
    return (
      <div className="allpage-signup">
        <div className="container">
          <div className="main-content-signup">
            <div className="row register-title">
              <div className="col-xs-5 text-white  mt-4 title mb-4">
                <h1>
                  <b>WE</b>
                  LCOME
                </h1>
                <h1>
                  RE<b>SEARCHERS</b>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12 text-white mb-4">
                <div
                  className="background-image-profile-signup ml-4 mb-2"
                  style={{ "clip-path": "circle(50% at center)" }}
                >
                  {this.state.image_data !== null ? (
                    <img src={this.state.image_data} width={"100%"} />
                  ) : null}
                </div>

                <div className="input-jumbotron upload-btn mr-5 ml-1">
                  <input
                    onChange={this.handlechange}
                    id="f02"
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="Upload"
                  />
                  <label for="f02">Upload</label>
                  {this.state.errors.image !== undefined &&
                  this.state.errors.image !== null ? (
                    <div className="wrongpass">
                      <p>{this.state.errors.image}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 text-white mt-4">
                <div className="username">
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light  p-1 pl-4"
                    id="id"
                    placeholder="Username"
                  />
                </div>
                {this.state.errors.username !== undefined &&
                this.state.errors.username !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.username}</p>
                  </div>
                ) : null}
                  {/*<div className="orcid">
                  <input
                    type="text"
                    name="orcid"
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light  p-1 pl-4 "
                    id="id"
                    placeholder="Orcid ID"
                  />
                </div>
                {this.state.errors.orcid !== undefined &&
                this.state.errors.orcid !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.orcid}</p>
                  </div>
                ) : null} */}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12 text-white">
                <div className="first_name ">
                  <input
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                    id="id"
                    placeholder="First Name"
                  />
                </div>
                {this.state.errors.first_name !== undefined &&
                this.state.errors.first_name !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.first_name}</p>
                  </div>
                ) : null}
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-md-12 text-white">
                <div className="last_name ">
                  <input
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                    id="id"
                    placeholder="Last Name"
                  />
                </div>
                {this.state.errors.last_name !== undefined &&
                this.state.errors.last_name !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.last_name}</p>
                  </div>
                ) : null}
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12 text-white">
                <div className="email ">
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light p-1 pl-4"
                    id="id"
                    placeholder="Email"
                  />
                </div>
                {this.state.errors.email !== undefined &&
                this.state.errors.email !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.email}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-white">
                <div className="password ">
                  <input
                    type="password"
                    name="password1"
                    value={this.state.password1}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light p-1 pl-4"
                    id="id"
                    placeholder="Password"
                  />
                </div>
                {this.state.errors.password1 !== undefined &&
                this.state.errors.password1 !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.password1}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-white">
                <div className="password ">
                  <input
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light p-1 pl-4"
                    id="id"
                    placeholder="Confirm password"
                  />
                </div>
                {this.state.errors.password2 !== undefined &&
                this.state.errors.password2 !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.password2}</p>
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12 text-white">
                <div className="institution">
                  <input
                    type="text"
                    name="institution"
                    value={this.state.institution}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                    id="id"
                    placeholder="Institution"
                  />
                </div>
                {this.state.errors.institution !== undefined &&
                this.state.errors.institution !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.institution}</p>
                  </div>
                ) : null}
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12 text-white">
                <div className="bio">
                  <textarea
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                    id="id"
                    rows="3"
                    column="10"
                    placeholder="Bio/Description"
                  />
                </div>
                {this.state.errors.bio !== undefined &&
                this.state.errors.bio !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.bio}</p>
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12 text-white">
                <div className="hash">
                  <input
                    name="interests"
                    onChange={this.handlechange}
                    className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                    id="id"
                    placeholder="#Hashtags"
                  />
                </div>
                {this.state.errors.interests !== undefined &&
                this.state.errors.interests !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.interests}</p>
                  </div>
                ) : null}
              </div>
            </div> */}
            <div class="row ">
              <div className="col-md-12 text-white mb-4">
                <button
                  onClick={this.handleRegister}
                  type="button"
                  className="text-white btn btn-create-account "
                >
                  Create Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignUp;
