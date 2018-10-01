import React, { Component } from "react";
import photo from "../../images/images.png";
import group from "../../images/group.png";
import local from "../../images/mappin.png";
import clip from "../../images/clip.png";

class Jumbotron extends Component {
  render() {
    return (
      <div className="write-pub bg-grey m-5 d-flex flex-column mr-auto ml-auto ">
        <div className="bla d-flex flex-row align-content-baseline">
          <div className="background-image-profile ml-3 mt-4" />
          <div className="textField align-self-end mt-4 ml-3 d-flex flex-row justify-content-end ">
            <textarea
              class="form-control z-depth-1"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Write something here..."
            />
          </div>
        </div>
        <div className="buttons d-flex flex-row justify-content-end mr-4 mt-3">
          <button type="button" class="btn-linx btn btn-light m-1">
            <img className="pr-1" src={clip} width="18" height="18" />
            Link
          </button>

          <button type="button" class="btn-foto btn btn-light m-1">
            <img className="pr-1" src={photo} width="18" height="18" />
            Foto/Vídeo
          </button>

          <button type="button" class="btn-id btn btn-light m-1">
            <img className="pr-1" src={group} width="18" height="18" />
            Identificar (...)
          </button>

          <button type="button" class="btn-local btn btn-light m-1">
            <img className="pr-1" src={local} width="18" height="18" />
            Localização
          </button>

          <button
            type="button"
            class="btn-local btn btn-secondary text-white m-1 ml-4 mt-2"
          >
            Publish
          </button>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
