import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const filterAnecdotes = (filter, anecdotes) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}


const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    console.log('FullAnecdote: ', anecdote)
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <div>
      {filterAnecdotes(filter, anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList