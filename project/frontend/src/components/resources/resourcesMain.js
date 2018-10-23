import React, { Component } from "react";
import NavBar from "../navbar/navBar";
import Popup from "./popup";
import ResourceItem from "./resourceItem";
import Request from "../../request";
import CheckboxItem from "./checkboxItem";

class ResourcesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: "hidden",
      resources: [],
      checkboxTags: [],
      //save id of selected checkbox's
      clickedTags: []
    };
    this.handleShowPopup = this.handleShowPopup.bind(this);
    this.handleShowResource = this.handleShowResource.bind(this);
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
    });
    Request.get("api/user/resource/gettags").then(response => {
        response.json().then(tags => {
            this.setState({checkboxTags: tags});
        })
    });
  };

  componentDidMount() {
    this.updateResources();
  }

  handleShowResource(checkboxtag, value) {
    // clone state arrays for setstate
    var clickedTags = [...this.state.clickedTags];

    // if we have multiple selected checkbox's we add the new selection to the array
    if (value) {
      clickedTags.push(checkboxtag);
    } else {
      // if a checkbox have been deselected
      clickedTags.splice(clickedTags.indexOf(checkboxtag), 1);
    }

    this.setState({clickedTags: clickedTags});
    let tags = "";
    for(let i = 0; i < clickedTags.length; i++){
      tags += clickedTags[i] + ","
    }
    tags = tags.substring(0, tags.length - 1);

    if (clickedTags.length === 0){
        Request.get("api/user/resource").then(response => {
            response.json().then(resources => {
                this.setState({resources: resources});
            })
        });
    }
    else {
        Request.get("api/user/resource/tags", {tags: tags}).then(response => {
            response.json().then(resources => {
                this.setState({resources: resources});
            })
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Popup toShow={this.state.showPopup} toHide={this.handleShowPopup} update={this.updateResources} />
        <div className="container resources-main">
          <div className="row ">
            <div className="col-md-12 title">
              Resources <a onClick={() => this.handleShowPopup("show")}>+</a>
            </div>
            <div className="col-md-3">
              <div className="interests-checkbox">
                {this.state.checkboxTags.map(checkbox => (
                  <CheckboxItem
                    key={Math.random()}
                    value={this.state.clickedTags.indexOf(checkbox) !== -1}
                    label={checkbox}
                    toFilter={this.handleShowResource}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-9 resource-item-container">
              {this.state.resources.map(resource => (
                  <ResourceItem data={resource} update={this.updateResources}/>
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourcesMain;
