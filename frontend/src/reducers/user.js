import { LOGIN_ACTION, LOGOUT_ACTION } from "../constants/actions";

const user = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.username,
        tasks: action.tasks
      });
    case LOGOUT_ACTION:
      return Object.assign({}, state, { isLoggedIn: false });
    default:
      return state;
  }
};

export default user;
