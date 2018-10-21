import React, { Component } from "react";
import Jumbotron from "./jumbotron";
import NavBar from "../navbar/navBar";
import Pub1 from "./pub1";
import Pub2 from "./pub2";
import Request from "../../request";
import AddComent from "./addcoment";
import Popup from "./popup";
import TestFetch from "../textfetch";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      articles: []
    };
  }

  componentDidMount() {
    Request.get("api/user/profile/0").then(response => {
      response.json().then(data => {
        this.setState({
          userData: data
        });
      });
    });
    Request.get("api/feed/articlebyinterests").then(response => {
      response.json().then(data => {
        this.setState({
          articles: data
        });
      });
    });
  }

  render() {
    console.log(this.state.articles);
    return (
      <React.Fragment>
        <NavBar />
        <Jumbotron userData={this.state.userData} />
        {this.state.articles.map(article => (
          <Pub1 data={article} />
        ))}
        {/*
        <Pub1 />
        <Pub1 />
        <Pub1 />
        <Pub1 />
        <Pub2 />
        <Pub2 />
        */}
      </React.Fragment>
    );
  }
}

export default Feed;
