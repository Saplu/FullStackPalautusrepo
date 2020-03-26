import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>
      setGood(good + 1)

  const handleNeutralClick = () =>
    setNeutral(neutral + 1)

  const handleBadClick = () =>
    setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Header text='statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) =>
  <h1>{text}</h1>

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0){
    return(
      <h4>No feedback given yet.</h4>
    )
  }
  return(
    <table>
      <tbody>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={good + neutral + bad}/>
      <StatisticsLine text='average' value={(good - bad) / (good + neutral + bad)}/>
      <StatisticsLine text='positive' value={good / (good + neutral + bad) * 100} extra='%'/>
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, value, extra}) => 
  <tr>
    <td>{text}</td>
    <td>{value}{extra}</td>
  </tr>

ReactDOM.render(
  <App />, document.getElementById('root')
);
