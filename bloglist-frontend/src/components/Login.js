import React from 'react'
const Login = (user) => (
  <div>
    <h2>Log in to application</h2>
    <form>
      <label for="username">Username: </label>
      <input id="username" name="username" type="text"></input><br/>
      <label for="password">Password: </label>
      <input id="password" name="password" type="password"></input><br/>
      <button type="submit">login</button>
    </form>
  </div>
)

export default Login