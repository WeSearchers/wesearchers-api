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
    };
  }

  componentDidMount() {
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
      let reader = new FileReader();

      reader.onload = e => {
        this.setState({ image_data: reader.result })
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
      if (elem !== "image_data") {
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
        console.log("nay")
      }
    })
  };

  render() {
    return (
      <div className="edit-user-profile section-card">
        <h3>Edit Profile</h3>
        <a href="/user/profile" className="fa fa-times" />
        <label>First Name</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>Last Name</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>ORCID</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Please make sure your orcid has 16 numbers.</p>
        </div>
        <label>Affiliation</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>Research unit</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>Email</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>Skype</label>
        <input type="text" placeholder="..." />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>Biography</label>
        <textarea placeholder="..." />
        <label>Interests</label>
        <input type="text" />
        <div className="wrongpass">
          <p>Not a valide answer.</p>
        </div>
        <label>language</label>
        <input type="text" placeholder="..." />
        <button type="submit" value="">
          save changes
        </button>
      </div>
    );
  }
}

export default EditUserProfileForm;
