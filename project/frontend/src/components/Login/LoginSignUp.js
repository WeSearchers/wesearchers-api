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
      class = "upload-btn text-white btn btn-secondary mt-2 mb-4" >
      Upload
      </button>
      </div>
      <div className = "d-flex flex-column justify-content-right ml-5 mt-2" >
      <div className="name ">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="Your name"
      />
      </div>
      <div className="orcid">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="orcid ID"
      />
      </div>
      </div>
      </div>
      <div className = "d-flex flex-column justify-content-right mb-3" >
      <div className="email ">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="email"
      />
      </div>
      </div>

      <div className = "d-flex flex-column justify-content-right mb-3" >
      <div className="password ">
      <textarea
        class="form-control-coment z-depth-1 bg-light boder-radius-sm p-1 pl-4 mb-3"
        id="exampleFormControlTextarea6"
        rows="3"
        placeholder="password"
      />

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
