import React, { Component } from "react";
import Jumbotron from "./jumbotron";
import NavBar from "../navbar/navBar";
import Pub1 from "./pub1";
import Pub2 from "./pub2";
import Request from "../../request";
import AddComent from "./addcoment";
import Popup from "./popup";
import TweetPub from "./tweetpub";
import RedditPub from "./redditpub";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : null,
      posts: []
    }
  }

  componentDidMount() {
    Request.get("api/user/profile/0").then(response => {
      response.json().then(data => {
        this.setState({
          userData: data
        });
      });
    });
    Request.get("api/feed/posts").then( response => {
      response.json().then( data => {
        this.setState({
          posts: data,
        })
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Jumbotron userData={this.state.userData}/>
        {this.state.posts.map(post => {
          if (post.type === "twitter")
            return <TweetPub data={post}/>;
          else if (post.type === "reddit")
            return <RedditPub data={post}/>;
        })}
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
