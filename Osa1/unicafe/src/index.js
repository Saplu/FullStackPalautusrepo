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

const Statistics = ({good, neutral, bad}) =>
<div>
  <div>good {good}</div>
  <div>neutral {neutral}</div>
  <div>bad {bad}</div>
  <div>all {good + neutral + bad}</div>
  <div>average {(good - bad) / (good + neutral + bad)}</div>
  <div>positive {good / (good + neutral + bad) * 100}%</div>
</div>

ReactDOM.render(
  <App />, document.getElementById('root')
);
