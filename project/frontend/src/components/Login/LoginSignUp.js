import React, {
  Component
} from 'react';

class LoginSignUp extends Component {
  state = {};
  render() {
    return (
      <div className = " d-flex flex-row justify-content-center mt-5 mb-5" >
      <div className = "d-flex flex-column justify-content-center " >
      <div className = "  d-flex flex-column" >
      <h1 > < b > WE < /b>LCOME</h1 >
      <h1 > SEARCHERS < /h1>
      </div>
      <div className = "d-flex flex-row mt-5" >
      <div className = "d-flex flex-column justify-content-start align-content-start" >
      <div className = "background-image-profile ml-2" / >
      <button type = "button"
      class = "upload-btn text-white btn btn-secondary mt-2" >
      Upload
      </button>
      </div>
      <div className = "d-flex flex-column justify-content-right ml-5 mt-2" >
      <div className="name ">
      <p className = "bg-light boder-radius-sm p-2 "> Your name </p>
      </div>
      <div className="orcid">
      <p className = " bg-light boder-radius-sm p-2 mb-5 " > orcid ID </p>
      </div>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right " >
      <div className="email ">
      <p className = "bg-light boder-radius-sm p-2 "> email </p>
      </div>
      </div>

      <div className = "d-flex flex-column justify-content-right " >
      <div className="password ">
      <p className = "bg-light boder-radius-sm p-2"> password </p>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right" >
      <div className="institution">
      <p className = "bg-light boder-radius-sm p-2 "> institution </p>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right" >
      <div className="bio">
      <p className = "bg-light boder-radius-sm p-2 "> bio/description </p>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right " >
      <div className="hash">
      <p className = "bg-light boder-radius-sm p-2 "> # </p>
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
