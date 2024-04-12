import React from 'react';
import { Outlet } from 'react-router-dom';
import { YoutubeApiProvider } from '@/context/YoutubeApiContext';

const Container = () => {
  return (
    <div className='flex pt-container-top pb-8 sm:pt-container-top-sm'>
      <div className='flex-initial w-full pl-0 sm:pl-20 xl:pl-60'>
        <div className='px-4 py-0 sm:px-4'>
          <YoutubeApiProvider>
            <Outlet />
          </YoutubeApiProvider>
        </div>
        <div className='h-header-sm pt-con'></div>
      </div>
    </div>
  );
};

export default Container;
