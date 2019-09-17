import { LOGIN_ACTION, LOGOUT_ACTION } from "../constants/actions";
export const login = (username, tasks) => ({
  type: LOGIN_ACTION,
  username: username,
  tasks: tasks
});

export const logout = () => ({
  type: LOGOUT_ACTION
});
