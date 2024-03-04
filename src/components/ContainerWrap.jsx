import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from '../context/YoutubeApiContext';
import NavWrap from './NavWrap';
import ContentWrap from './ContentWrap';

const ContainerWrap = () => {
  const queryClient = new QueryClient();
  return (
    <div className='container-wrap'>
      <NavWrap />
      <QueryClientProvider client={queryClient}>
        <YoutubeApiProvider>
          <ContentWrap />
        </YoutubeApiProvider>
      </QueryClientProvider>
    </div>
  );
};

export default ContainerWrap;
