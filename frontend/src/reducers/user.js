const user = (state =  {isLoggedIn : false}, action) => {
  switch (action.type) {
    case 'LOGIN':
        return Object.assign({}, state, {isLoggedIn : true, username: action.username, tasks: action.tasks});
    case 'LOGOUT':
        return Object.assign({}, state, {isLoggedIn : false});
    default:
      return state
  }
}

export default user