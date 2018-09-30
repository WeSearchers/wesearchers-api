import React, {Component} from 'react';
import PropTypes from "prop-types";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class SignupForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
    };
    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
        orcid: "",
        interests: "",
        bio: "",
        image: null,
    };
    handleChange = e => {
        if (e.target.name === "image")
            this.setState({["image"]: e.target.files[0]});
        else
            this.setState({[e.target.name]: e.target.value});
    };


    handleSubmit = e => {
        e.preventDefault();
        let conf;
        switch (this.props.method) {
            case "post":
                const fd = new FormData();
                let state = this.state;
                for (let elem in state) {
                    if (state[elem].filename !== undefined)
                        fd.append(elem, state[elem], state[elem].filename);
                    else
                        fd.append(elem, state[elem]);
                }
                fd.append("institution", "1");
                let request = new XMLHttpRequest();
                request.open("POST", this.props.endpoint);
                request.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                request.send(fd);
                break;
        }

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="input"
                       type="text"
                       name="username"
                       placeholder="Name"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="email"
                       placeholder="Email"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="password1"
                       placeholder="Password"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="password2"
                       placeholder="Verify Password"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="orcid"
                       placeholder="ORCID"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="interests"
                       placeholder="interests"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="bio"
                       placeholder="Bio"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="file"
                       name="image"
                       onChange={this.handleChange}
                />
                <button type="submit" className="button is-info">
                    Send message
                </button>
            </form>
        );
    }
}

export default SignupForm;