import React, { Component } from "react";
import FeedMain from '../components/feed/feedMain';
class Feed extends Component {
  state = {
    pubs: []
  };
  render() {
    return (
      <FeedMain />
    );
  }
}

export default Feed;
