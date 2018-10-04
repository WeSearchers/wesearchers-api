import React, { Component } from "react";

class Post extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* jmmonteiro array de publicações através do fetch, que renderize todas como está em baixo*/}
        <div className="section-card publication">
          <div className="photo" />
          <div className="info">
            <div className="title-and-author">
              {/* jmmonteiro colocar titulo da publicação através do fetch */}
              <div className="title">Publication title </div>
              {/* jmmonteiro colocar autor da publicação através do fetch */}
              <div className="author">Author</div>
            </div>
            {/* jmmonteiro colocar texto da publicação através do fetch */}
            <div className="text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam quis
              nulla. Aliquam ante. Nulla accumsan, elit sit amet varius semper,
              nulla mauris mollis quam, tempor suscipit diam nulla vel leo.
              Maecenas sollicitudin. Pellentesque habitant morbi tristique.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
