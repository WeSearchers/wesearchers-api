import React, {
  Component
} from 'react';
import Request from "../../request"

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password1: '',
      password2: '',
      bio: '',
      orcid: '',
      image: '',
      interests: '',
      institution: '',
      image_data: null
    }
  }

  handlechange = event => {
    if (event.target.type === 'file') {
      let file = event.target.files[0];
      let reader  = new FileReader();

      reader.onload = e => {
        this.setState({image_data: reader.result})
      };
      reader.readAsDataURL(file);

      this.setState(
        {
          [event.target.name]: event.target.files[0],
        }
      )
    }
    else {
      this.setState(
        {
          [event.target.name]: event.target.value,
        }
      )
    }
    console.log(this.state)
  };

  handleRegister = event => {
    /**FAZER CONFIRMAÇÕES E CENAS */
    let data = new FormData();

    for (let elem in this.state) {
      if(elem !== "image_data") {
          if (this.state[elem].filename !== undefined)
              data.append(elem, this.state[elem], this.state[elem].filename);
          else
              data.append(elem, this.state[elem]);
      }
    }

    Request.post("api/user/register", data).then(response => {
      if (response.status === 200) {
        window.location.assign(window.location.origin + "/register/success");
      }
      else {
        console.log("nay")
      }
    })
  };

  render() {
    return (
      <div className=" d-flex flex-row justify-content-center allpage-signup" >
        <div className="d-flex flex-column justify-content-center pl-5 pr-5 pb-5 pt-5 mt-5 mb-5 main-content-signup boder-radius-xs" >
          <div className="d-flex flex-column text-white" >
            <h1><b>WE</b>LCOME</h1>
            <h1> SEARCHERS </h1>
          </div>

          <div className="d-flex flex-row mt-5" >
            <div className="d-flex flex-column justify-content-start align-content-start ml-2" >
              <div className="background-image-profile-signup ml-4 mb-2" style={{"clip-path": "circle(50% at center)"}}>
                {this.state.image_data !== null ?
                  <img src={this.state.image_data} width={"100%"}/> : null
                }
              </div>
              <div className="input-jumbotron upload-btn mr-5 ml-1">
              <input onChange={this.handlechange} id="f02" type='file' name="image" accept="image/*" placeholder="Upload"/>
              <label for="f02">Upload</label>
              </div>

            </div>

            <div className="d-flex flex-column justify-content-right ml-5 mt-2" >
              <div className="username">
                <input
                  type="text"
                  name='username'
                  value={this.state.username}
                  onChange={this.handlechange
                  }
                  className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                  id="id"
                  placeholder="Username"
                />
              </div>
              <div className="orcid">
                <input
                  type="text"
                  name='orcid'
                  value={this.state.orcid}
                  onChange={this.handlechange}
                  className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                  id="id"
                  placeholder="Orcid ID"
                />
              </div>
              <div className="wrongpass">
              <p>Please make sure your orcid has 16 numbers.</p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-right mb-3 mt-5" >
            <div className="first_name ">
              <input
                type="text"
                name='first_name'
                value={this.state.first_name}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="last_name ">
              <input
                type="text"
                name='last_name'
                value={this.state.last_name}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="email ">
              <input
                type="text"
                name='email'
                value={this.state.email}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="password ">
              <input
                type="password"
                name='password1'
                value={this.state.password1}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="Password"
              />

            </div>
            <div className="wrongpass">
            <p>Please make sure you write the right password.</p>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="password ">
              <input
                type="password"
                name='password2'
                value={this.state.password2}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="Confirm password"
              />

            </div>
            <div className="wrongpass">
            <p>Please make sure you write the right password.</p>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="institution">
              <input
                type="text"
                name='institution'
                value={this.state.institution}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="Institution"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="bio">
              <textarea
                name='bio'
                value={this.state.bio}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                column="10"
                placeholder="Bio/Description"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right " >
            <div className="hash">
              <input
                name='interests'
                value={this.state.interests}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                placeholder="#Hashtags"
              />
            </div>
            <div className="wrongpass">
            <p>Please make sure you put at least 6 hashtags.</p>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right" >
            <button
              onClick={this.handleRegister}
              type="button"
              className="text-white btn btn-create-account mt-2"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignUp;
