import React, { Component } from "react";
import Request from "../../request";

class EditUserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      orcid: "",
      bio: "",
      image: null,
      image_data: null,
      interests: "",
      institution: "",
      errors: {}
    };
  }

  componentDidMount(){
    Request.get('api/user/profile/0').then(response => {
      response.json().then(data => {
        let interestStr = "";
        data.image_data = "data:image/jpeg;base64, " + data.image_data;
        data.interests.forEach(interest => {
            interestStr += interest + " "
        });
        data.interests = interestStr;
        //console.log(data)
        this.setState(
          data
        )
      });
    });
  }

  handleChange = event => {
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
  };

  handleSubmit = event => {
    let data = new FormData();

    for (let elem in this.state) {
      if(elem !== "image_data" && elem !== "errors") {
          if (elem === "image") {
              if (this.state[elem] !== null)
                  data.append(elem, this.state[elem]);
          }
          else if (this.state[elem].filename !== undefined)
              data.append(elem, this.state[elem], this.state[elem].filename);
          else
              data.append(elem, this.state[elem]);
      }
    }

    Request.post("api/user/profile", data).then(response => {
      if (response.status === 200) {
        window.location.assign(window.location.origin + "/user/profile");
      }
      else {
        response.json().then(errors => {
          this.setState({errors : errors})
        })
      }
    })
  };

  render() {
    return (
      <div className="edit-user-profile section-card">
        <h3>Edit Profile</h3>
        <a href="/user/profile" className="fa fa-times" />
        <div className="d-flex flex-column justify-content-start align-content-start" >
          <div className="background-image-profile ml-2" style={{"clip-path": "circle(50% at center)"}}>
            {this.state.image_data !== null ?
              <img src={this.state.image_data} width={"100%"}/> : null
            }
          </div>
          <input onChange={this.handleChange} type='file' name="image" accept="image/*" />
          {this.state.errors.image !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.image}</p>
            </div>
            ) : null
          }
        </div>
        <div>
            <div>
                <label>First Name</label>
            </div>
            <input
            type="text"
            name="first_name"
            onChange={this.handleChange}
            value={this.state.first_name}
            />
            {this.state.errors.first_name !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.first_name}</p>
            </div>
            ) : null
            }
        </div>
        <div>
            <label>Last Name</label>
        </div>
        <input
            type="text"
            name="last_name"
            onChange={this.handleChange}
            value={this.state.last_name}
        />
        {this.state.errors.last_name !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.last_name}</p>
            </div>
            ) : null
        }
        <div>
            <label>ORCID</label>
        </div>
        <input
            type="text"
            name="orcid"
            onChange={this.handleChange}
            value={this.state.orcid}
        />
        {this.state.errors.orcid !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.orcid}</p>
            </div>
            ) : null
        }
        <div>
            <label>Biography</label>
        </div>
        <textarea
            placeholder="..."
            name="bio"
            onChange={this.handleChange}
            value={this.state.bio}
        />
        {this.state.errors.bio !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.bio}</p>
            </div>
            ) : null
        }
        <div>
            <label>Interests</label>
        </div>
        <input
            type="text"
            name="interests"
            onChange={this.handleChange}
            value={this.state.interests}
        />
        {this.state.errors.interests !== undefined ? (
            <div className="wrongpass">
              <p>{this.state.errors.interests}</p>
            </div>
            ) : null
        }
        <div>
        <button onClick={this.handleSubmit}>
          save changes
        </button>
        </div>
      </div>
    );
  }
}

export default EditUserProfileForm;
