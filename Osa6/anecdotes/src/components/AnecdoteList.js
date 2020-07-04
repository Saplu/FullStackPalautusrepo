import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

  const AddVote = (id) => {
    props.vote(id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  const sortAnecdotes = () => {
    const sortedAnecdotes = [].concat(props.anecdotes).sort((a, b) => a.votes < b.votes ? 1 : -1)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default connectedAnecdotes