import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('GetAll: ', response.data)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const updateVote = async (anecdote) => {
  const fullUrl = baseUrl + '/' + anecdote.id
  const updatedAnecdote = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1,
  }

  const response = await axios.put(fullUrl, updatedAnecdote)
  return response.data
}

export default { 
  getAll,
  createNew,
  updateVote,
}