import React, { Component } from "react";
import Jumbotron from "./jumbotron";
import NavBar from "../navBar";
import Pub1 from "./pub1";
import Pub2 from "./pub2";
import Request from '../../request';
import AddComent from "./addcoment";
import Popup from "./popup";
import TestFetch from "../textfetch";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    Request.get("api/feed/articlebyinterests").then( response => {
      response.json().then( data => {
        this.setState({
          articles: data,
        })
      })
    })
  }
    
  render() {
    console.log(this.state.articles);
    return (
      <React.Fragment>
        <NavBar />
        <Jumbotron />
        {this.state.articles.map( article => (
          <Pub1 data={article}/>
        ))}
        {/*
        <Pub1 />
        <Pub1 />
        <Pub1 />
        <Pub1 />
        <Pub2 />
        <Pub2 />
        */}
        <Pub1 />
        </React.Fragment>
    );
  }
}

export default Feed;
