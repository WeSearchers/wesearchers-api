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
    }
  }

  handlechange = event => {
    if (event.target.type === 'file') {
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
  }

  handleRegister = event => {
    /**FAZER CONFIRMAÇÕES E CENAS */

    let data = new FormData();

    for (let elem in this.state) {
      if (this.state[elem].filename !== undefined)
        data.append(elem, this.state[elem], this.state[elem].filename);
      else
        data.append(elem, this.state[elem]);
    }

    Request.post("api/user/register", data).then(response => {
      if (response.status === 200) {
        console.log("yay")
      }
      else {
        console.log("nay")
      }
    })
  }

  render() {
    return (
      <div className=" d-flex flex-row justify-content-center mt-5 mb-5" >
        <div className="d-flex flex-column justify-content-center " >
          <div className="  d-flex flex-column" >
            <h1><b>WE</b>LCOME</h1>
            <h1> SEARCHERS </h1>
          </div>

          <div className="d-flex flex-row mt-5" >
            <div className="d-flex flex-column justify-content-start align-content-start" >
              <div className="background-image-profile ml-2" />
              {/*
              <button type="button"
                className="upload-btn text-white btn btn-secondary mt-2 mb-4"
              >
                Upload
              </button>
              */}
              <input onChange={this.handlechange} type='file' name="image" accept="image/*" />
            </div>

            <div className="d-flex flex-column justify-content-right ml-5 mt-2" >
              <div className="name ">
                <textarea
                  name='username'
                  value={this.state.username}
                  onChange={this.handlechange}
                  className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                  id="id"
                  rows="3"
                  placeholder="Username"
                />
              </div>
              <div className="orcid">
                <textarea
                  name='orcid'
                  value={this.state.orcid}
                  onChange={this.handlechange}
                  className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                  id="id"
                  rows="3"
                  placeholder="orcid ID"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="first_name ">
              <textarea
                name='first_name'
                value={this.state.first_name}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="last_name ">
              <textarea
                name='last_name'
                value={this.state.last_name}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="email ">
              <textarea
                name='email'
                value={this.state.email}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="email"
              />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="password ">
              <textarea
                name='password1'
                value={this.state.password1}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="password"
              />

            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="password ">
              <textarea
                name='password2'
                value={this.state.password2}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="password2"
              />

            </div>
          </div>
          <div className="d-flex flex-column justify-content-right mb-3" >
            <div className="institution">
              <textarea
                name='institution'
                value={this.state.institution}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="institution"
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
                placeholder="bio/description"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right " >
            <div className="hash">
              <textarea
                name='interests'
                value={this.state.interests}
                onChange={this.handlechange}
                className="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
                id="id"
                rows="3"
                placeholder="#"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-right" >
            <button
              onClick={this.handleRegister}
              type="button"
              className="text-white btn btn-secondary mt-2"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right mb-3" >
      <div className="institution">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="institution"
      />
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right mb-3" >
      <div className="bio">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="bio/description"
      />
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right " >
      <div className="hash">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="#"
      />
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right" >
      <button type = "button"
      class = "text-white btn btn-secondary mt-2" >
      Create Account
      </button>
      </div>
      </div>
            </div>
    );
  }
}

export default LoginSignUp;
