import { Link } from 'react-router-dom';
import { VideoItem } from '@/domain/Video';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const VideoList = ({ video }: { video: VideoItem }) => {
  const { id } = video;
  const { channelTitle, publishedAt, title, thumbnails, description } = video.snippet;

  const channerColor = `rgb(${Math.floor(Math.random() * 128 + 100)},${Math.floor(
    Math.random() * 128 + 100
  )},${Math.floor(Math.random() * 128 + 100)})`;

  return (
    <li>
      <Link to={`/videos/watch?v=${id}`} state={{ video }} className='flex flex-col sm:flex-row'>
        <div className='flex-none w-full max-w-full min-w-full sm:w-2/5 sm:max-w-[360px] sm:min-w-[180px]'>
          <div className='w-full rounded-2xl  overflow-hidden aspect-video'>
            <img
              src={`${thumbnails.medium.url}`}
              className='w-full h-full object-cover'
              alt='섬네일 이미지'
            />
          </div>
        </div>
        <div className='flex-row pt-2 sm:flex-col sm:py-0 sm:pt-0 sm:pl-4 md:py-2 md:pl-6'>
          <div
            className='block flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden sm:hidden'
            style={{ backgroundColor: `${channerColor}` }}
          >
            {channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className='font-bold text-neutral-950 dark:font-semibold dark:text-neutral-100 text-lg line-clamp-1 sm:pt-0 lg:line-clamp-2'>
              {title.replaceAll(/&#39;/gi, "'").replaceAll(/&quot;/gi, '"')}
            </p>
            <div className={'flex items-center'}>
              <div
                className='flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden hidden sm:block'
                style={{ backgroundColor: `${channerColor}` }}
              >
                {channelTitle.charAt(0).toUpperCase()}
              </div>
              <p className='text-sm font-medium leading-5 text-[#888888]'>{channelTitle}</p>
            </div>
            <p className='text-[#888888] text-sm pt-0 sm:pt-3'>{dayjs(publishedAt).fromNow()}</p>
            <p className='description text-[#888888] text-sm  max-sm:hidden sm:pt-0 sm:line-clamp-1 md:pt-1 lg:line-clamp-2'>
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoList;
