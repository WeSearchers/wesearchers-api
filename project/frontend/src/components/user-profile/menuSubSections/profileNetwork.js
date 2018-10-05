import React, { Component } from "react";
import SubSection from "./network/subSection";
import User from "./network/user";
import Request from '../../../request'

class ProfileNetwork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subSections: [
        { id: "1", title: "Advisors", visible: "hidden" },
        { id: "2", title: "Followers", visible: "hidden" },
        { id: "3", title: "Following", visible: "hidden" }
      ],
      followers: [
        /*
        {
          bio: "asd",
          email: "ze_jmm@hotmail.com",
          first_name: "jose",
          image_data: "iVBORw0KGgoAAAANSUhEUgAAAQoAAABICAYAAAAOLLsaAAAgAE",
          institution: 2,
          last_name: "monteiro",
          orcid: "1234567890123456",
          user_id: 1,
          username: "jmmonteiro",
        },
        {
          bio: "asd",
          email: "ze_jmm@hotmail.com",
          first_name: "jose",
          image_data: "iVBORw0KGgoAAAANSUhEUgAAAQoAAABICAYAAAAOLLsaAAAgAE",
          institution: 2,
          last_name: "monteiro",
          orcid: "1234567890123456",
          user_id: 1,
          username: "jmmonteiro",
        }*/
      ],
      following: [
        /*
        {
          bio: "asd",
          email: "ze_jmm@hotmail.com",
          first_name: "jose",
          image_data: "iVBORw0KGgoAAAANSUhEUgAAAQoAAABICAYAAAAOLLsaAAAgAE",
          institution: 2,
          last_name: "monteiro",
          orcid: "1234567890123456",
          user_id: 1,
          username: "jmmonteiro",
        },
        {
          bio: "asd",
          email: "ze_jmm@hotmail.com",
          first_name: "jose",
          image_data: "iVBORw0KGgoAAAANSUhEUgAAAQoAAABICAYAAAAOLLsaAAAgAE",
          institution: 2,
          last_name: "monteiro",
          orcid: "1234567890123456",
          user_id: 1,
          username: "jmmonteiro",
        }*/
      ],
    };
  }


  componentDidMount() {
    Request.get("api/user/followers", {}).then(response => {
      response.json().then(data => {
        this.setState(
          {
            followers: data,
          }
        )
      })
    })
    Request.get("api/user/following", {}).then(response => {
      response.json().then(data => {
        this.setState(
          {
            following: data,
          }
        )
      })
    })
  }

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
        {/*
        <SubSection
          name="Advisors"
          key={this.state.subSections[0].id}
          title={this.state.subSections[0].title}
          subSection={this.state.subSections[0]}
          turnVisible={this.handleTurnVisible}
          visible={this.state.subSections[0].visible}
        />
        */}
        <SubSection
          name="Followers"
          data={this.state.followers}
          key={this.state.subSections[1].id}
          title={this.state.subSections[1].title}
          subSection={this.state.subSections[1]}
          turnVisible={this.handleTurnVisible}
          visible={this.state.subSections[1].visible}
        />
        <SubSection
          name="Following"
          data={this.state.following}
          key={this.state.subSections[2].id}
          title={this.state.subSections[2].title}
          subSection={this.state.subSections[2]}
          turnVisible={this.handleTurnVisible}
          visible={this.state.subSections[2].visible}
        />
        {/* jmmonteiro passar os utilizadores (ex: colaboradores / seguidores..) para a secção correspondente como podes ver no state acima, através do fetch */}
        {/*this.state.subSections.map(subSection => (
          <SubSection
            key={subSection.id}
            title={subSection.title}
            subSection={subSection}
            turnVisible={this.handleTurnVisible}
            visible={subSection.visible}
          />
        ))*/}
      </div>
    );
  }
}

export default ProfileNetwork;
