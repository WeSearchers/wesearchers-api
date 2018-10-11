import React, { Component } from "react";
import photo from "../../images/images.png";
import group from "../../images/group.png";
import local from "../../images/mappin.png";
import clip from "../../images/clip.png";
import Request from "../../request"

class Jumbotron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      url: '',
      media_url: '',
      tags: "random test geirinhas_preciso_que_arranges_maneira_de_as_tags_ficarem_de_maneira_direitinha_nesta_string_:3",
    }
  }

  handleChange = ev => {
    this.setState({[ev.target.name]: ev.target.value});
  };

  handleSubmit = ev => {
    let fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("text", this.state.text);
    fd.append("url", this.state.url);
    fd.append("media_url", this.state.media_url);
    fd.append("tags", this.state.tags);
    Request.post('api/feed/article', fd);
  };

  render() {
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto ">
        <div className="bla d-flex flex-row align-content-baseline">
          <div className="background-image-profile ml-3 mt-4" />
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <input
              className="form-control z-depth-1"
              name="title"
              onChange={this.handleChange}
              placeholder="Title"
            />
          </div>
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <textarea
              className="form-control z-depth-1"
              id="exampleFormControlTextarea6"
              rows="3"
              name="text"
              onChange={this.handleChange}
              placeholder="Create a new post..."
            />
          </div>
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <input
              className="form-control z-depth-1"
              name="url"
              onChange={this.handleChange}
              placeholder="Article URL"
            />
          </div>
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <input
              className="form-control z-depth-1"
              name="media_url"
              onChange={this.handleChange}
              placeholder="Media URL"
            />
          </div>
        </div>
        <div className="buttons d-flex flex-row justify-content-end mr-4 mt-3">
          <button type="button" className="btn-linx btn btn-light m-1">
            <img className="pr-1" src={clip} width="18" height="18" />
            Link
          </button>

          <button type="button" className="btn-foto btn btn-light m-1">
            <img className="pr-1" src={photo} width="18" height="18" />
            Image / Video
          </button>

          <button type="button" className="btn-id btn btn-light m-1">
            <img className="pr-1" src={group} width="18" height="18" />
            Identify (...)
          </button>

          <button type="button" className="btn-local btn btn-light m-1">
            <img className="pr-1" src={local} width="18" height="18" />
            Location
          </button>

          <button
            type="button"
            className="btn-local btn btn-secondary text-white m-1 ml-4 mt-2"
            onClick={this.handleSubmit}
          >
            Publish
          </button>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
