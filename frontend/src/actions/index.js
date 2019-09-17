export const login = (username, tasks) => ({
    type: 'LOGIN',
    username: username,
    tasks: tasks
})

export const logout = () => ({
  type: 'LOGOUT'
})