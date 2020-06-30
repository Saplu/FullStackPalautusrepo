import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const AddVote = (id) => {
      dispatch(vote(id))
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