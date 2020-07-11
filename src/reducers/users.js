import {RECEIVE_USERS} from '../actions/users';

//state is the users slice of the state
export default function users (state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}
