import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS ='RECEIVE_TWEETS'
export const TOGGLE_LIKE ='TOGGLE_LIKE'

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function toggleLike ({id, authedUser, hasLiked}) {
  return {
    type: TOGGLE_LIKE,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleLike (info) {
  return (dispatch) => {
     dispatch(toggleLike(info))

     return saveLikeToggle(info)
      .catch((e)=> {
        console.warn('Error in handleToggleLike: ', e)
        dispatch(toggleLike(info))
        alert('There was an error liking the tweet. Try again.')
      })
  }
}
