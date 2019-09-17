import { login,logout } from '../actions'

const user = (state = logout, action) => {
  switch (action.type) {
    case 'LOGIN':
        return action.username
    case 'LOGOUT':
        return action.username
    default:
      return state
  }
}

export default user