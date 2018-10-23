import React, { Component } from "react";
import NavBar from "../navbar/navBar";
import Popup from "./popup";
import ResourceItem from "./resourceItem";
import Request from "../../request";

class ResourcesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: "hidden",
      resources: []
    };
    this.updateResources = this.updateResources.bind(this);
  }

  handleShowPopup = show => {
    if (this.state.showPopup !== show) {
      this.setState({
        showPopup: show
      });
    }
  };

  updateResources = event => {
    Request.get("api/user/resource").then(response => {
      response.json().then(resources => {
        this.setState({resources: resources});
      })
    })
  };

  componentDidMount() {
    this.updateResources();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Popup toShow={this.state.showPopup} toHide={this.handleShowPopup} update={this.updateResources} />
        <div className="container resources-main">
          <div className="row ">
            <div className="title">
              Resources <a onClick={() => this.handleShowPopup("show")}>+</a>
            </div>
            {this.state.resources.map(resource => (
              <ResourceItem data={resource}/>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourcesMain;
