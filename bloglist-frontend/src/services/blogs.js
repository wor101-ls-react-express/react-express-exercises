import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { authorization: token },
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const submitNewBlog = async (blog) => {
  const config = {
    headers: { authorization: token },
  }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

export default { getAll, setToken, submitNewBlog }