export const login = username => ({
  type: 'LOGIN',
  username: username
})

export const logout = username => ({
  type: 'LOGOUT',
  username: username
})