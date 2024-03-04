import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';
import classNames from 'classnames/bind';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
const cx = classNames.bind(styles);
register('ko', koLocale);

export default function VideoCard({ video, style }) {
  const { id } = video;
  const { thumbnails, channelTitle, publishedAt, title, description } = video.snippet;

  const color = `rgb(${Math.floor(Math.random() * 128 + 100)},${Math.floor(Math.random() * 128 + 100)},${Math.floor(Math.random() * 128 + 100)})`;

  return (
    <li className={cx('video', style)}>
      <Link to={`/videos/watch/${id}`} state={{ video }}>
        <div className={styles.thumbnail}>
          <div className={styles.thumbnailBox}>
            <img src={`${thumbnails.medium.url}`} alt='섬네일 이미지' />
          </div>
        </div>
        <div className={styles.info}>
          <div className={`${styles.channelImg}`} style={{ backgroundColor: `${color}` }}>
            {channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={styles.title}>{title.replaceAll(/&#39;/gi, "'").replaceAll(/&quot;/gi, '"')}</p>
            <div className={styles.channelInfo}>
              <div className={`${styles.channelImg}`} style={{ backgroundColor: `${color}` }}>
                {channelTitle.charAt(0).toUpperCase()}
              </div>
              <p className={styles.channelTitle}>{channelTitle}</p>
            </div>
            <p className={styles.publishedAt}>{format(publishedAt, 'ko')}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
