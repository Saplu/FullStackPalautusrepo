import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const sortAnecdotes = () => {
    const sortedAnecdotes = [].concat(anecdotes).sort((a, b) => a.votes < b.votes ? 1 : -1)
    return (
      sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            had {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes()}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
