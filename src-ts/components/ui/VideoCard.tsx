import React from 'react';
import { Link } from 'react-router-dom';
import { publishedDate } from '@/utils/publishedData';

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
  const { id } = video;
  const { channelTitle, publishedAt, title, thumbnails, description } = video.snippet;

  const channerColor = `rgb(${Math.floor(Math.random() * 128 + 100)},${Math.floor(
    Math.random() * 128 + 100
  )},${Math.floor(Math.random() * 128 + 100)})`;

  return (
    <li className={`${style}`}>
      <Link
        to={`/videos/watch/${id}`}
        state={{ video }}
        className={`flex ${style ? 'flex-col sm:flex-row' : 'flex flex-col'}`}
      >
        <div
          className={`thumbnail ${
            style
              ? 'flex-none w-full max-w-full min-w-full sm:w-2/5 sm:max-w-[360px] sm:min-w-[180px]'
              : 'flex justify-center items-start w-full'
          }`}
        >
          <div className={`thumbnailBox w-full rounded-2xl  overflow-hidden aspect-video`}>
            <img
              src={`${thumbnails.medium.url}`}
              className='w-full h-full object-cover'
              alt='섬네일 이미지'
            />
          </div>
        </div>
        <div
          className={`info flex ${
            style
              ? 'flex-row pt-2 sm:flex-col sm:py-0 sm:pt-0 sm:pl-4 md:py-2 md:pl-6'
              : 'items-start pt-2'
          }`}
        >
          <div
            className={`channelImg flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden ${
              style ? 'block sm:hidden' : ''
            }`}
            style={{ backgroundColor: `${channerColor}` }}
          >
            {channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <p
              className={`title font-bold text-neutral-950 dark:font-semibold dark:text-neutral-100 ${
                style
                  ? 'text-lg line-clamp-1 sm:pt-0 lg:line-clamp-2'
                  : 'mb-1 text-base leading-5 line-clamp-2'
              }`}
            >
              {title.replaceAll(/&#39;/gi, "'").replaceAll(/&quot;/gi, '"')}
            </p>
            <div className={`channelInfo ${style ? 'flex items-center' : ''}`}>
              <div
                className={`channelImg flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden ${
                  style ? 'hidden sm:block' : 'hidden'
                }`}
                style={{ backgroundColor: `${channerColor}` }}
              >
                {channelTitle.charAt(0).toUpperCase()}
              </div>
              <p className='channelTitle text-sm font-medium leading-5 text-[#888888]'>
                {channelTitle}
              </p>
            </div>
            <p
              className={`publishedAt text-[#888888] ${
                style ? 'text-sm pt-0 sm:pt-3' : 'text-sm font-medium leading-5'
              }`}
            >
              {publishedDate(publishedAt)}
            </p>
            <p
              className={`description text-[#888888] ${
                style
                  ? 'text-sm  max-sm:hidden sm:pt-0 sm:line-clamp-1 md:pt-1 lg:line-clamp-2'
                  : 'hidden'
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoCard;
