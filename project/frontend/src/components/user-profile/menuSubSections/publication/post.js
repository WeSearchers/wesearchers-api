import React, { Component } from "react";

class Post extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* jmmonteiro array de publicações através do fetch, que renderize todas como está em baixo*/}
        <div className="section-card publication">
          <div className="info">
            {/* jmmonteiro colocar titulo da publicação através do fetch */}
            <div className="publication-title">
              <b>Title </b> (date)
            </div>
            {/* jmmonteiro colocar texto da publicação através do fetch */}
            <div className="text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam quis
              nulla. Aliquam ante. Nulla accumsan, elit sit amet varius semper,
              nulla mauris mollis quam, tempor suscipit diam nulla vel leo.
              Maecenas sollicitudin. Pellentesque habitant morbi tristique.
            </div>
            {/* jmmonteiro colocar autor da publicação através do fetch */}
            <div className="publication-author"> Author's Name</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
