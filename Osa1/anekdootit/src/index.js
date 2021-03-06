import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = 
  useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [winner, setWinner] = useState(0)

  const NewRandom = () =>
    setSelected(GetRand(props.anecdotes.length))

  const Vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    let max = copy.indexOf(Math.max(...copy))
    setWinner(max)
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <Button handleClick={Vote} text='vote'/>
      <Button handleClick={NewRandom} text='Random anecdote'/>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[winner]}</p>
      <p>Has {points[winner]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function GetRand(max) {
  return Math.floor(Math.random() * max)
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)