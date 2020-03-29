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
      {courses.map(c => <Course key={c.id} name={c.name} parts={c.parts}/>)}
    </div>
  )
}

const Course = ({name, parts}) => {
  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
    </div>
  )
}


const Header = ({course}) => {
  return(
    <div>
      <h1>{course}</h1>
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

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
