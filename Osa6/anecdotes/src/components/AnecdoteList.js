import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const AddVote = (id) => {
    dispatch(vote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
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
            <button onClick={() => AddVote(anecdote.id)}>vote</button>
          </div>
        </div>)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes()}
    </div>
  )
}

export default Anecdotes