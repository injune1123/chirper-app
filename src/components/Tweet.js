import React, { Component } from 'react';
import { connnect, connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index';
class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()
    // todo: Hanndle Like Tweet.
  }
  toParent = (e, id) => {
    e.preventDefault()
    // todo: Redirect to parent Tweet.
  }

  render() {
    const {tweet} = this.props;

    if (tweet=== null) {
      return <p>This tweet doesn't exist</p>
    }

    const {name, avatar, timestamp, text, hasLiked, likes, replies, parent} = tweet;
    return (
      <div>
        <img
          src={avatar}
          alt={`Avatart of ${name}`}
        />
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          { parent && (
            <button onClick={(e) => this.toParent(e, parent.id)}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div>
            <TiArrowBackOutline/>
            <span>{replies !== 0 && replies}</span>
            <button onClick={this.handleLike}>
            {
              hasLiked === true?
                <TiHeartFullOutline/>
                : <TiHeartOutline/>
            }
            </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, tweets}, {id}) {
  const tweet = tweets[id]
  const parentTweet =tweet ? tweets[tweet.replyingTo] :null

  return {
    authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
  }
}

export default connect(mapStateToProps)(Tweet)
