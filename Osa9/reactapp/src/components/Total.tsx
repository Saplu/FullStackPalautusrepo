import React from 'react';
import { ContentProps } from '../types';

const Total: React.FC<ContentProps> = (props) => {
  return (
    <div>
      Number of Exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total;