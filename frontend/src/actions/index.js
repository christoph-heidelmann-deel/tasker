export const login = username => ({
  type: 'LOGIN',
  username: username
})

export const logout = () => ({
  type: 'LOGOUT'
})