import React, { Component } from "react";
import NavBar from "../navbar/navBar";
import Popup from "./popup";
import ResourceItem from "./resourceItem";
import CheckboxItem from "./checkboxItem";

class ResourcesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: "hidden",
      checkboxTags: [
        { id: 1, value: "Design", clicks: 1 },
        { id: 2, value: "Tech", clicks: 1 },
        { id: 3, value: "Frontend", clicks: 1 },
        { id: 4, value: "Backend", clicks: 1 },
        { id: 5, value: "Ui/Ux", clicks: 1 }
      ],
      resourceTags: [
        { id: 1, value: ["Design", "Tech"], show: true },
        { id: 2, value: ["Backend", "Tech"], show: true },
        { id: 3, value: ["Design", "Ui/Ux"], show: true },
        { id: 4, value: ["Design", "Backend"], show: true },
        { id: 5, value: ["Frontend", "Tech"], show: true }
      ],
      //save id of selected checkbox's
      clickedTags: []
    };
    this.handleShowPopup = this.handleShowPopup.bind(this);
    this.handleShowResource = this.handleShowResource.bind(this);
  }

  handleShowPopup(show) {
    if (this.state.showPopup !== show) {
      this.setState({
        showPopup: show
      });
    }
  }

  handleShowResource(checkboxId) {
    // clone state arrays for setstate
    var resourceTags = [...this.state.resourceTags];
    var checkboxTags = [...this.state.checkboxTags];
    var clickedTags = [...this.state.clickedTags];
    var matchArray = [];
    var dontMatchArray = [];
    console.log("checkbox clicks: " + checkboxTags[checkboxId].clicks);

    // if we have multiple selected checkbox's we add the new selection to the array
    if (checkboxTags[checkboxId].clicks === 1) {
      clickedTags.push(checkboxId);
    } else {
      // if a checkbox have been deselected
      if (checkboxTags[checkboxId].clicks === 2) {
        clickedTags.splice(clickedTags.indexOf(checkboxId), 1);
      }
    }

    for (var i = 0; i < resourceTags.length; i++) {
      //refresh variable at the loop
      console.log("i: " + i);
      var saveNotMatch = "";
      for (var l = 0; l < clickedTags.length; l++) {
        console.log("l: " + l);
        // console.log(checkboxTags[checkboxId].value);
        if (
          resourceTags[i].value.includes(checkboxTags[clickedTags[l]].value)
        ) {
          console.log(resourceTags[i].id);
          matchArray.push(resourceTags[i].id);
          break; //make sure we dont repeat id's if exists several matches
        } else {
          //make sure dont repeat the same action
          if (saveNotMatch.length !== "") {
            saveNotMatch = resourceTags[i].id;
          }
          //make sure that until the last tag verification we dont add the resource id to dontMatch array
          if (l === clickedTags.length - 1 && saveNotMatch.length !== "") {
            dontMatchArray.push(saveNotMatch);
          }
        }
      }
    }
    // set state of show / clicks !!!!!!!! (done)
    //condition clickedtags clear id (done)

    //setup arrays with new information to proceed to setstate
    for (var r = 0; r < resourceTags.length; r++) {
      console.log(matchArray[r] + " " + resourceTags[r].id);
      if (matchArray.includes(resourceTags[r].id)) resourceTags[r].show = true;
      else resourceTags[r].show = false;
    }
    if (checkboxTags[checkboxId].clicks === 1)
      checkboxTags[checkboxId].clicks = 2;
    else checkboxTags[checkboxId].clicks = 1;

    //restore initial stage if none of the checkbox's are selected
    if (checkboxTags[checkboxId].clicks === 1 && clickedTags.length === 0) {
      for (var a = 0; a < resourceTags.length; a++) {
        resourceTags[a].show = true;
      }
    }

    this.setState({ clickedTags, resourceTags, checkboxTags });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Popup toShow={this.state.showPopup} toHide={this.handleShowPopup} />
        <div className="container resources-main">
          <div className="row ">
            <div className="col-md-12 title">
              Resources <a onClick={() => this.handleShowPopup("show")}>+</a>
            </div>
            <div className="col-md-3">
              <div className="interests-checkbox">
                {this.state.checkboxTags.map(checkbox => (
                  <CheckboxItem
                    key={checkbox.id}
                    id={checkbox.id}
                    label={checkbox.value}
                    toFilter={this.handleShowResource}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-9 resource-item-container">
              {this.state.resourceTags.map(resource => (
                <ResourceItem
                  key={resource.id}
                  tags={resource.value}
                  toShow={resource.show}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourcesMain;
