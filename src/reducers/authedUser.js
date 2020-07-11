import {SET_AUTHED_USER} from '../actions/authedUser';

//state is the users slice of the state
export default function authedUser (state=null, action) {
  switch(action.type) {
    case SET_AUTHED_USER:
      return action.id
    default:
      return state
  }
}
