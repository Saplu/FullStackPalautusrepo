import React from 'react';
import { ContentProps } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Parts: React.FC<ContentProps> = (props) => {
  let value: string[] = [];
  props.courses.forEach(part => {
    switch (part.name) {
      case "Fundamentals":
        value = value.concat(`${part.name}, ${part.exerciseCount}, ${part.description}`);
        break;
      case "Using props to pass data":
        value = value.concat(`${part.name}, ${part.exerciseCount}, ${part.groupProjectCount}`);
        break;
      case "Deeper type usage":
        value = value.concat(`${part.name}, ${part.exerciseCount}, ${part.description}, ${part.exerciseSubmissionLink}`);
        break;
      case "Interfaces are cool":
        value = value.concat(`${part.name}, ${part.exerciseCount}, ${part.description}, ${part.magicNumber}`);
        break;
      default:
        return assertNever(part);
    }
  })
  return (
    <div>
      {value.map(v =>
        <p key={v[0]}>
          {v}
        </p> 
      )}
    </div>
  )
}

export default Parts;