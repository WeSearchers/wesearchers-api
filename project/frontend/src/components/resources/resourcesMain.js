import React, { Component } from "react";
import NavBar from "../navbar/navBar";
import Popup from "./popup";
import ResourceItem from "./resourceItem";

class ResourcesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: "hidden"
    };
    this.handleShowPopup = this.handleShowPopup.bind(this);
  }

  handleShowPopup(show) {
    if (this.state.showPopup !== show) {
      this.setState({
        showPopup: show
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Popup toShow={this.state.showPopup} toHide={this.handleShowPopup} />
        <div className="container resources-main">
          <div className="row ">
            <div className="title">
              Resources <a onClick={() => this.handleShowPopup("show")}>+</a>
            </div>
            <ResourceItem />
            <ResourceItem />
            <ResourceItem />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourcesMain;
