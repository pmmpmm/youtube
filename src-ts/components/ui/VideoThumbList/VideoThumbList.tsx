import React from 'react';
import { Link } from 'react-router-dom';
import { publishedDate } from '@/utils/publishedData';
import styles from './VideoThumbList.module.css';

interface videoProps {
  id: string;
  snippet: {
    channelTitle: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: { url: string };
    };
  };
}
const VideoThumbList = ({ video }: { video: videoProps }) => {
  const { id } = video;
  const { title, publishedAt, thumbnails, channelTitle } = video.snippet;

  return (
    <li className={styles.video}>
      <Link to={`/videos/watch/${id}`} state={{ video }}>
        <div className={styles.thumbnail}>
          <div className={styles.thumbnailBox}>
            <img src={thumbnails.default.url} alt='' />
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.channelTitle}>{channelTitle}</p>
          <p className={styles.publishedAt}>{publishedDate(publishedAt)}</p>
        </div>
      </Link>
    </li>
  );
};

export default VideoThumbList;
