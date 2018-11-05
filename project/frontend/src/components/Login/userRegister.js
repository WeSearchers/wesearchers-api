import React, { Component } from "react";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password1: "",
      password2: "",
      bio: "",
      orcid: "",
      image: "",
      interests: "",
      institution: "",
      image_data: null,
      errors: {}
    };
  }

  handlechange = event => {
    if (event.target.type === "file") {
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
        if (this.state[elem].filename !== undefined)
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
      <div className="register-page ">
        <div className="container">
          <div className="col-md-12 container-logo">
            <div className="logo">
              {" "}
              <b>WE</b>
              LCOME <br />
              RE
              <b>SEARCHERS</b>
            </div>
          </div>
          <div className=" col-md-12 register-header">
            <div className="row">
              <div className="col-md-4 container-upload-img">
                <div
                  className="user-photo"
                  style={{ "clip-path": "circle(50% at center)" }}
                >
                  {this.state.image_data !== null ? (
                    <img src={this.state.image_data} width={"100%"} />
                  ) : null}
                </div>
                <input
                  className="input-upload-file"
                  onChange={this.handlechange}
                  id="f02"
                  type="file"
                  name="image"
                  accept="image/*"
                  placeholder="Upload"
                />
                {this.state.errors.image !== undefined &&
                this.state.errors.image !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.image}</p>
                  </div>
                ) : null}
              </div>

              <div className="col-md-8 container-name-orcid">
                <input
                  id="id"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handlechange}
                  placeholder="Username"
                />
                {this.state.errors.username !== undefined &&
                this.state.errors.username !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.username}</p>
                  </div>
                ) : null}
                <input
                  id="id"
                  name="orcid"
                  value={this.state.orcid}
                  onChange={this.handlechange}
                  type="text"
                  placeholder="Orcid ID"
                />
                {this.state.errors.orcid !== undefined &&
                this.state.errors.orcid !== null ? (
                  <div className="wrongpass">
                    <p>{this.state.errors.orcid}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-md-12 register-main">
            <div className="col md-12">
              <input
                id="id"
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handlechange}
                placeholder="First Name"
              />
              {this.state.errors.first_name !== undefined &&
              this.state.errors.first_name !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.first_name}</p>
                </div>
              ) : null}
              <input
                id="id"
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handlechange}
                placeholder="Last Name"
              />
              {this.state.errors.last_name !== undefined &&
              this.state.errors.last_name !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.last_name}</p>
                </div>
              ) : null}

              <input
                id="id"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handlechange}
                placeholder="Email"
              />
              {this.state.errors.email !== undefined &&
              this.state.errors.email !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.email}</p>
                </div>
              ) : null}
              <input
                id="id"
                type="password"
                name="password1"
                value={this.state.password1}
                onChange={this.handlechange}
                placeholder="Password"
              />
              {this.state.errors.password1 !== undefined &&
              this.state.errors.password1 !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.password1}</p>
                </div>
              ) : null}
              <input
                id="id"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.handlechange}
                placeholder="Confirm Password"
              />
              {this.state.errors.password2 !== undefined &&
              this.state.errors.password2 !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.password2}</p>
                </div>
              ) : null}

              <input
                id="id"
                type="text"
                name="institution"
                value={this.state.institution}
                onChange={this.handlechange}
                placeholder="Institucion"
              />
              {this.state.errors.institution !== undefined &&
              this.state.errors.institution !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.institution}</p>
                </div>
              ) : null}
              <textarea
                id="id"
                name="bio"
                value={this.state.bio}
                onChange={this.handlechange}
                placeholder="Bio/Description"
              />
              {this.state.errors.bio !== undefined &&
              this.state.errors.bio !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.bio}</p>
                </div>
              ) : null}
              <input
                id="id"
                type="text"
                name="interests"
                value={this.state.interests}
                onChange={this.handlechange}
                placeholder="#Hashtags"
              />
              {this.state.errors.interests !== undefined &&
              this.state.errors.interests !== null ? (
                <div className="wrongpass">
                  <p>{this.state.errors.interests}</p>
                </div>
              ) : null}
              <button
                onClick={this.handleRegister}
                className="general-btn yellow-btn"
                style={{ color: "#fafafa", maxWidth: "100%" }}
                type="button"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegister;
