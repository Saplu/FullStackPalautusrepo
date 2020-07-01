const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ADD':
      return [...state, action.data]
    case 'INITIALIZE':
      return action.data
    default: return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}

export default reducer