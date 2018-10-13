import React, { Component } from "react";
import Request from "../../request";
import Comment from "./comment";

class AddComent extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: [],
      text: "",
      userData: null
    }
  }

  componentDidMount() {
    Request.get("api/feed/commentsbyarticle/" + this.props.id).then( response => {
      response.json().then( data => {
        console.log(data);
        this.setState({comments: data});
      })
    });
    Request.get("api/user/profile/0").then(response => {
      response.json().then(userData => {
        this.setState({userData : userData});
      })
    })
  }

  handleSubmit = event => {
    event.currentTarget.reset();
    event.preventDefault();
    let text = this.state.text;
    let comments = this.state.comments.slice(0);
    let fd = new FormData();
    fd.append("article_id", String(this.props.id));
    fd.append("text", text);
    Request.post("api/feed/comment", fd).then( response => {
      if (response.status === 200) {
        response.json().then( id => {
          comments.push({id: id, text: text, user_id:0});
          this.setState({comments: comments});
        });
      }
    })
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="d-flex flex-column justify-content-center ">
        <div className="newcoment d-flex flex-column pb-2 pt-3 mb-4 bg-grey boder-radius-sm">
          <div className="d-flex">
            <div className="background-image-profile ml-3">
              {this.state.userData !== null ?
                <img src={"data:image/jpeg;base64, " + this.state.userData.image_data} width={"100%"} style={{"clip-path": "circle(50% at center)"}}/> : null
              }
            </div>
            <textarea
              class="form-control-coment z-depth-1 ml-4 mr-3"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Add new coment..."
              name="text"
              onChange={this.handleChange}
            />
          </div>
          <div className="d-flex flex-row justify-content-end mb-2 popbtn">
            {" "}
            <input
              type="submit"
              class="btn btn-publish text-white bg-dark p-2 mr-4 mt-3 boder-radius-sm"
              value="Submit"
            />
          </div>
        </div>
          {this.state.comments.map(comment => <Comment key={comment.id} data={comment}/>)}
      </div>
      </form>
    );
  }
}

export default AddComent;
