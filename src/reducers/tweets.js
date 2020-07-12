import {RECEIVE_TWEETS, TOGGLE_LIKE} from '../actions/tweets';

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
    default:
      return state
  }
}
