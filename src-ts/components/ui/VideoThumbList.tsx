import React from 'react';
import { Link } from 'react-router-dom';
import { publishedDate } from '@/utils/publishedData';

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
    <li className='video w-full'>
      <Link to={`/videos/watch/${id}`} state={{ video }} className='flex gap-x-2 w-full'>
        <div className='thumbnail lex-none min-w-[10.5rem]'>
          <div className='thumbnailBox w-full rounded-lg overflow-hidden aspect-video'>
            <img src={thumbnails.default.url} className='w-full h-full object-cover' alt='' />
          </div>
        </div>
        <div className='info flex-initial'>
          <p className='title text-sm font-semibold leading-5 line-clamp-2 text-neutral-950 dark:font-semibold dark:text-neutral-100'>
            {title}
          </p>
          <p className='channelTitle pt-2 text-xs font-normal text-neutral-500'>{channelTitle}</p>
          <p className='publishedAt text-xs font-normal text-neutral-500'>
            {publishedDate(publishedAt)}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default VideoThumbList;
