import React, { Component } from "react";
import SubMenuMain from "./subMenuMain";
import SideMenuMain from "./sideMenuMain";
import NavBar from "../navBar";
class InnerMenuMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: "empty",
      showSideMenu: "settings"
    };
    this.handleShowSubMenu = this.handleShowSubMenu.bind(this);
  }

  handleShowSubMenu(menu) {
    if (this.state.showSubMenu !== menu) {
      this.setState({
        showSubMenu: menu
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container inner-menu-main">
          <div className="row ">
            <SideMenuMain
              subMenu={this.state.showSubMenu}
              onShowSubMenu={this.handleShowSubMenu}
            />
            <SubMenuMain toShow={this.state.showSubMenu} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InnerMenuMain;
