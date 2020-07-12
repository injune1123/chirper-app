import {RECEIVE_TWEETS, TOGGLE_LIKE, ADD_TWEET} from '../actions/tweets';

//state is the users slice of the state
export default function tweets (state={}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }

    case TOGGLE_LIKE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true ?
          state[action.id].likes.filter((uid) => uid !== action.authedUser)
          : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET:
      const { tweet } = action;
      //modified the parent tweet that this tweet replies to
      let replyingTo = {}
      if (tweet.replyingTo !== null) {
        replyingTo={
          [tweet.replyingTo]:{
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }
      return {
        ...state,
        [tweet.id]: tweet,
        tweets,
        ...replyingTo,
      }
    default:
      return state
  }
}
