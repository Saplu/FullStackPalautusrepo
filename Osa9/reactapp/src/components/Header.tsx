import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.header}</h1>;
}

export default Header;