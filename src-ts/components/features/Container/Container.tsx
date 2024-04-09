import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Container.module.css';
import { YoutubeApiProvider } from '@/context/YoutubeApiContext';

const Container = () => {
  return (
    <div className={styles.container}>
      <div className={styles['content-wrap']}>
        <div className={styles.content}>
          <YoutubeApiProvider>
            <Outlet />
          </YoutubeApiProvider>
        </div>
      </div>
    </div>
  );
};

export default Container;
