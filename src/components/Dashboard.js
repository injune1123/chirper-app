import React, {Component} from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Your Timeline</h3>
        <ul>{this.props.tweetIds.map((id)=>(
          <li key={id}>
            <div>TWEET ID: {id}</div>
          </li>
        ))}</ul>
      </div>
    )
  }
}

function mapStateToProps ({tweets}){
  return {
    tweetIds: Object.keys(tweets)
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard);