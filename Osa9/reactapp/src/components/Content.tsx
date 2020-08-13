import React from 'react';
import { ContentProps } from '../types';

const Content: React.FC<ContentProps> = (props) => {
  return(
    <div>
      {props.courses.map(c => 
        <p key={c.name}>
          {c.name}
          {c.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content;