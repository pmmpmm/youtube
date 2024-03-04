import React from 'react';
import { Outlet } from 'react-router-dom';

const ContentWrap = () => {
  return (
    <div className='content-wrap'>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default ContentWrap;
