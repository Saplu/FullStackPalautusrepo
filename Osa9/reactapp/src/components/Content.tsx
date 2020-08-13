import React from 'react';
import { ContentProps } from '../types';
import Parts from './Part'

const Content: React.FC<ContentProps> = (props) => {
  return <Parts courses={props.courses}/>
}

export default Content;