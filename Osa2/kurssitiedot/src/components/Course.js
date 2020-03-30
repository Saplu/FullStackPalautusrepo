import React from 'react';

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

export default Course