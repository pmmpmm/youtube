import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  const { id } = video;
  const { thumbnails, channelTitle, publishedAt, title } = video.snippet;
  return (
    <li className='video'>
      <Link to={`/videos/watch/${id}`} state={{ video }}>
        <div>
          <img src={`${thumbnails.medium.url}`} alt='' />
        </div>
        <p className='title'>{title}</p>
        <p>{channelTitle}</p>
        <p>{publishedAt}</p>
      </Link>
    </li>
  );
}
