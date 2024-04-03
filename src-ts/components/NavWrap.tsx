import React from 'react';
import Nav from './Nav/Nav';

const NavWrap = () => {
  return (
    <div className={`nav-wrap`}>
      <Nav use='not-mo' />
      <Nav use='mo' />
    </div>
  );
};

export default NavWrap;
