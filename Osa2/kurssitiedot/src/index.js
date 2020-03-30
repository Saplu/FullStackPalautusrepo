import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course';

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

ReactDOM.render(<App />, document.getElementById('root'));
