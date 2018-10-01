import React, { Component } from "react";
import SubSection from "./network/subSection";
import User from "./network/user";

class ProfileNetwork extends Component {
  state = {
    subSections: [
      { id: "1", title: "mentors", visible: "hidden" },
      { id: "2", title: "mentors", visible: "hidden" },
      { id: "3", title: "mentors", visible: "hidden" },
      { id: "4", title: "mentors", visible: "hidden" }
    ]
  };

  handleTurnVisible = section => {
    const subSections = [...this.state.subSections];
    const index = subSections.indexOf(section);
    subSections[index].visible = "show";
    for (let i = 0; i < subSections.length; i++) {
      if (i != index) {
        subSections[i].visible = "hidden";
      }
    }
    this.setState({ subSections });
  };

  render() {
    return (
      <div
        className={
          "col-md-12 " + (this.props.toShow == "network" ? "show" : "hidden")
        }
      >
        {this.state.subSections.map(subSection => (
          <SubSection
            key={subSection.id}
            subSection={subSection}
            turnVisible={this.handleTurnVisible}
            visible={subSection.visible}
          />
        ))}
      </div>
    );
  }
}

export default ProfileNetwork;
