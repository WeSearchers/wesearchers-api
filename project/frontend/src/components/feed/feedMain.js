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
import loading from "../../images/loading.gif";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : null,
      posts: [],
      page: 0,
      loading: false
    }
  }

  checkEnd = () => {
    if ( !this.state.loading && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      this.getMorePosts()
    }
  };

  getMorePosts = () => {

      this.setState({loading: true});
    Request.get("api/feed/posts", {page:this.state.page}).then( response => {
      response.json().then( data => {
        let posts = this.state.posts.concat(data);
        this.setState({
          posts: posts,
            page: this.state.page + 1,
            loading: false
        })
      })
    });
  };

  componentDidMount() {
    window.onscroll = this.checkEnd;
    Request.get("api/user/profile/0").then(response => {
      response.json().then(data => {
        this.setState({
          userData: data
        });
      });
    });
    this.getMorePosts()

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
          {this.state.loading ?
          <img className="loading-icon m-5 bg-grey d-flex flex-column mr-auto ml-auto" src={loading}/>
            : null
              }
      </React.Fragment>
    );
  }
}

export default Feed;
