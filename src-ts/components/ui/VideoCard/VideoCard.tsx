import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface videoProps {
  id: string;
  snippet: {
    channelTitle: string;
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}
const VideoCard = ({ video, style }: { video: videoProps; style: string }) => {
  const { channelTitle, publishedAt, title, description, thumbnails } =
    video.snippet;
  const color = `rgb(${Math.floor(Math.random() * 128 + 100)},${Math.floor(
    Math.random() * 128 + 100
  )},${Math.floor(Math.random() * 128 + 100)})`;

  return (
    <li className={cx('video', style)}>
      <Link to={`/`} state={{ video }}>
        <div className={styles.thumbnail}>
          <div className={styles.thumbnailBox}>
            <img src={`${thumbnails.medium.url}`} alt='섬네일 이미지' />
          </div>
        </div>
        <div className={styles.info}>
          <div
            className={`${styles.channelImg}`}
            style={{ backgroundColor: `${color}` }}
          >
            {channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={styles.title}>
              {title.replaceAll(/&#39;/gi, "'").replaceAll(/&quot;/gi, '"')}
            </p>
            <div className={styles.channelInfo}>
              <div
                className={`${styles.channelImg}`}
                style={{ backgroundColor: `${color}` }}
              >
                {channelTitle.charAt(0).toUpperCase()}
              </div>
              <p className={styles.channelTitle}>{channelTitle}</p>
            </div>
            <p className={styles.publishedAt}>{publishedAt}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoCard;
