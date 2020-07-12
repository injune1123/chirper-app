import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index';
import { handleToggleLike } from '../actions/tweets';

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()
    const { dispatch, tweet, authedUser } = this.props
    dispatch(handleToggleLike({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)
  }

  render() {
    const {tweet} = this.props;

    if (tweet=== null) {
      return <p>This tweet doesn't exist</p>
    }

    const {id, name, avatar, timestamp, text, hasLiked, likes, replies, parent} = tweet;
    return (
      <Link to={`/tweet/${id}`}>
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
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet))
