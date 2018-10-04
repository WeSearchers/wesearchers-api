import React, { Component } from "react";
import SubSection from "./network/subSection";
import User from "./network/user";

class ProfileNetwork extends Component {
  state = {
    subSections: [
      { id: "1", title: "Advisors", visible: "hidden" },
      { id: "2", title: "Followers", visible: "hidden" },
      { id: "3", title: "Following", visible: "hidden" }
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
          "col-md-12 mt40 " +
          (this.props.toShow == "network" ? "show" : "hidden")
        }
      >
        {/* jmmonteiro passar os utilizadores (ex: colaboradores / seguidores..) para a secção correspondente como podes ver no state acima, através do fetch */}
        {this.state.subSections.map(subSection => (
          <SubSection
            key={subSection.id}
            title={subSection.title}
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
