import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises} />
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part pName={props.part1.name} eCount={props.part1.exercises} />
      <Part pName={props.part2.name} eCount={props.part2.exercises} />
      <Part pName={props.part3.name} eCount={props.part3.exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.e1 + props.e2 + props.e3}</p>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.pName} {props.eCount}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
