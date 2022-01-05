import anecdoteService from '../services/anecdotes'
import { clearNotification } from '../reducers/notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((item1, item2) => item2.votes - item1.votes)
}

let notifictionTimeout = null

export const voteAnecdote = (anecdote) => {
  if (notifictionTimeout) {
    clearTimeout(notifictionTimeout)
  }

  return async dispatch => {
    let response = await anecdoteService.updateVote(anecdote)
    console.log('UpdateResponse: ', response)
    dispatch({
      type: 'VOTE',
      data: {
        content: response.content,
        id: response.id,
        votes: response.votes,
      }
    })
    notifictionTimeout = setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export const createAnecdote = (content) => {
  if (notifictionTimeout) {
    clearTimeout(notifictionTimeout)
  }

  console.log('Anecdote: ', content)
  return async dispatch => {
    let newAnecdote =  await anecdoteService.createNew({ content: content, votes: 0}) 
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    }) 
    notifictionTimeout = setTimeout(() => dispatch(clearNotification()), 5000)  
  }
}

  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      console.log("GetResponse: ", anecdotes)
      dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes,
      })
    }
  }


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      let updatedAnecdotes = state.map(object => {
        if (object.id === action.data.id) {
          let newObject = {
                ...object,
                votes: object.votes + 1,
              }
          console.log('New Object: ', newObject)
          return newObject
        }
        return {...object}
      })
      return sortByVotes(updatedAnecdotes)
    case 'NEW_ANECDOTE':
      return sortByVotes([...state, action.data])
    case 'INIT_ANECDOTES':
      console.log('Attemping to return initial state')
      console.log('ActionData: ', action.data)
      return action.data

    default:
      return state
  }

}

export default anecdoteReducer