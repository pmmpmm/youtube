import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Videos from '@/pages/Videos';
import VideoDetail from '@/pages/VideoDetail';
import NotFound from '@/pages/NotFound';
import NavVideos from '@/pages/NavVideos';
import styles from './Container.module.css';
import { YoutubeApiProvider } from '@/context/YoutubeApiContext';

const Container = () => {
  return (
    <div className={styles.container}>
      <div className={styles['content-wrap']}>
        <div className={styles.content}>
          <YoutubeApiProvider>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<Videos />} />
              <Route path='videos' element={<Videos />} />
              <Route path='videos/:keyword' element={<Videos />} />
              <Route path='videos/watch/:id' element={<VideoDetail />} />
              <Route path='page/:navName' element={<NavVideos />} />
            </Routes>
          </YoutubeApiProvider>
        </div>
      </div>
    </div>
  );
};

export default Container;
