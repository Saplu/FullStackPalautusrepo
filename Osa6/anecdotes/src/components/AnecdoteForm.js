import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const AddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))

    dispatch(setNotification(`Added new anecdote: ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={AddAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote