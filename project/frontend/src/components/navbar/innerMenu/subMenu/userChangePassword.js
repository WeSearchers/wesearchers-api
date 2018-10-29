import React, { Component } from "react";
import Request from "../../../../request";

class UserChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password1: '',
      new_password2: '',
      errors: {}
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSave = event => {
    event.preventDefault();
      let fd = new FormData();
      for(let elem in this.state){
          if(elem !== "errors")
            fd.append(elem, this.state[elem]);
      }
      Request.post("api/user/password", fd).then( response => {
        if (response.status === 200)
          window.location.assign(window.location.origin + "/");
        else{
            response.json().then(errors => {
                this.setState({errors: errors})
            })
        }
      })
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSave}
          className={
            "form-change-password " +
            (this.props.toShow === "changepassword" ? "show" : "hidden")
          }
          action=""
        >
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="Old password"
              name="old_password"
              required
            />
              {this.state.errors.old_password !== undefined && this.state.errors.old_password !== null ? (
                    <div className="wrongpass">
                      <p>{this.state.errors.old_password}</p>
                    </div>
                    ) : null}
          </div>
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="New password"
              name="new_password1"
              required
            />
              {this.state.errors.new_password1 !== undefined && this.state.errors.new_password1 !== null ? (
                    <div className="wrongpass">
                      <p>{this.state.errors.new_password1}</p>
                    </div>
                    ) : null}
          </div>
          <div className="input-password">
            <input
              className="general-input"
              onChange={this.handleChange}
              type="password"
              placeholder="Confirm new password"
              name="new_password2"
              required
            />
              {this.state.errors.new_password2 !== undefined && this.state.errors.new_password2 !== null ? (
                    <div className="wrongpass">
                      <p>{this.state.errors.new_password2}</p>
                    </div>
                    ) : null}
          </div>
          <input
            className="general-btn yellow-btn"
            type="submit"
            value="save"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default UserChangePassword;
