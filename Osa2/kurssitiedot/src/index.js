import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id : 1,
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10,
    id: 1
    },
    {
    name: 'Using props to pass data',
    exercises: 7,
    id: 2
    },
    {
    name: 'State of a component',
    exercises: 14,
    id: 3
    }
  ]
}
const second = {
  name: 'Second half of the stack',
  id : 2,
  parts: [
    {
      name: 'Basics of life',
      exercises: 3,
      id: 4
    },
    {
      name: 'Universum',
      exercises: 8,
      id: 5
    },
    {
      name: 'And everything',
      exercises: 12,
      id: 6
    }
  ]
}

const courses = [course, second]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(c => <Course key={c.id} name={c.name} parts={c.parts}/>)}
    </div>
  )
}

const Course = ({name, parts}) => {
  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}


const Header = ({course}) => {
  return(
    <div>
      <h2>{course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <div>
      <h4>Number of exercises: {parts.reduce((previous, current) => console.log(previous, current) || previous + current.exercises, 0)}</h4>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
