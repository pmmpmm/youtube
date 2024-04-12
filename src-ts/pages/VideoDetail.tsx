import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { useYoutubeApi } from '@/context/YoutubeApiContext';
import VideoThumbList from '@/components/ui/VideoThumbList/VideoThumbList';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { id } = video;
  const { channelId, channelTitle, description, title } = video.snippet;
  const { youtube } = useYoutubeApi();

  // 채널 섬네일
  const getChannelDetail = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
    return youtube.channelDetail(queryKey[1]);
  };
  const { data: channelDetail } = useQuery({
    queryKey: ['channelDetail', channelId],
    queryFn: getChannelDetail,
  });

  // 채널 관련 동영상
  const getChannelVideos = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
    return youtube.channelVideos(queryKey[1]);
  };
  const { data: channelVideos } = useQuery({
    queryKey: ['channelVideos', channelId],
    queryFn: getChannelVideos,
  });

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:gap-x-6'>
        <div className='w-full lg:w-2/3 md:min-w-[640px]'>
          <iframe
            id='player'
            title='YouTube video player'
            allow='fullscreen'
            src={`http://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`}
            className='w-full aspect-video rounded-2xl overflow-hidden'
          ></iframe>
          <div className='pt-6'>
            <p className='text-xl font-bold'>{title}</p>
            <div className='flex items-center pt-2 pb-4'>
              <div className='flex-initial w-11 h-11 rounded-full overflow-hidden relative after:block after:w-full after:h-full after:rounded-full after:rounded-br-full after:absolute after:top-0 after:left-0 after:shadow-[inset_-1px_-1px_4px_rgba(0,0,0,0.1)]'>
                <img
                  src={channelDetail && channelDetail.thumbnails.default.url}
                  alt=''
                  className='w-full h-full rounded-full'
                />
              </div>
              <p className='pl-2 text-sm font-semibold'>{channelTitle}</p>
            </div>
            <div className='text-base'>
              <p className='tx'>{description}</p>
            </div>
          </div>
        </div>
        <ul className='flex flex-col gap-y-3 w-full mt-8 pt-8 border-t border-[var(--bg-color-200)] lg:w-1/3 lg:mt-0 lg:pt-0 lg:border-t-0'>
          {channelVideos &&
            channelVideos.map((item: any) => <VideoThumbList key={item.id} video={item} />)}
        </ul>
      </div>
    </>
  );
}
