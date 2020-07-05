import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {

  const AddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.setNotification(`Added new anecdote: ${content}`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const connectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default connectedNewAnecdote