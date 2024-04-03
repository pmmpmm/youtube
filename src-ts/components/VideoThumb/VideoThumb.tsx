import React from 'react';
import { Link } from 'react-router-dom';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import styles from './VideoThumb.module.css';

register('ko', koLocale);

export default function VideoThumb({ video }) {
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
          <p className={styles.publishedAt}>{format(publishedAt, 'ko')}</p>
        </div>
      </Link>
    </li>
  );
}
