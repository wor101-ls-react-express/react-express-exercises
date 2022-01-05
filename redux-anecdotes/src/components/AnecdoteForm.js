import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
//import { clearNotification } from '../reducers/notificationReducer'
//import anecdoteServices from '../services/anecdotes'


const NewAnecdote = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    //dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
}

const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)

export default ConnectedNewAnecdote
//export default NewAnecdote