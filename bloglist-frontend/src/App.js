import React, { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className="error">
      {notification}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [formHidden, setFormHidden] = useState(true)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const updateNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000) 
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('User: ', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setNotification(`Successfully logged in as ${username}`)
      setUsername('')
      setPassword('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  

    } catch(exception) {
      updateNotification('Wrong credentials used')
      // setErrorMessage('Wrong credentials')
      console.log('Wrong Credentials')
      console.log(exception)
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      <p>{user}</p>
    </form>          
  )

  const logoutUser = () => {
    console.log('Logging out user')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setBlogs([])
  }

  const submitNewBlog = async (event) => {
    event.preventDefault();
    console.log('Submitting new blog')

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      blogService.submitNewBlog(newBlog)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      updateNotification(`A new blog '${newBlog.title}' by ${newBlog.author} added`)
      hideForm()
    } catch(exception) {
      console.log('Error submitting new blog')
      console.log(exception)
    }
    
  }


  let formDisplayHidden = { display: formHidden ? 'none' : ''}

  let formDisplayVisible = { display: formHidden ? '' : 'none'}


  const hideForm = () => {
    setFormHidden(true)
  }

  const showForm = () => {
    setFormHidden(false)
  }

  if (user === null) {
    return loginForm() 
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <div>
          {user.name} logged-in<button onClick={logoutUser}>logout</button>
      </div><br/>
      <h2>create new</h2>
      {/* <Togglable buttonLabel="new blog" ref={blogFormRef}>
      </Togglable> */}


      <form onSubmit={submitNewBlog} style={formDisplayHidden}>
        <label for="title">title: </label>
        <input id="title" name="title"></input><br/>
        <label for="author">author: </label>
        <input id="author" name="author"></input><br/>
        <label for="url">url: </label>
        <input id="url" name="url"></input><br/>
        <button type="submit">create</button>
      </form><br/>
      <button style={formDisplayVisible} onClick={showForm}>create new blog</button>
      <div>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App