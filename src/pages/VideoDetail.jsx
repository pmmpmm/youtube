import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading/Loading';
import Error from '../components/ErrorComponent/Error';
import VideoThumb from '../components/VideoThumb/VideoThumb';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { id } = video;
  const { channelId, channelTitle, description, title } = video.snippet;
  const { youtube } = useYoutubeApi();

  const { data: channelInfo } = useQuery({
    queryKey: ['channelInfo'],
    queryFn: () => {
      return youtube.channelInfo(channelId);
    },
  });
  const { data: channelVideos } = useQuery({
    queryKey: ['channelVideos'],
    queryFn: async () => {
      return youtube.channelVideos(channelId);
    },
  });
  return (
    <>
      <div className='video-detail'>
        <div className='video-wrap'>
          <iframe id='player' type='text/html' title='YouTube video player' allow='fullscreen' src={`http://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`}></iframe>
          <div className='video-info'>
            <p className='title'>{title}</p>
            <div className='channel-info'>
              <div className='thumbnail'>
                <img src={channelInfo && channelInfo.thumbnails.default.url} alt='' />
              </div>
              <p className='channel-title'>{channelTitle}</p>
            </div>
            <div className='description'>
              <p className='tx'>{description}</p>
            </div>
          </div>
        </div>
        <ul className='video-list'>{channelVideos && channelVideos.map((video) => <VideoThumb key={video.id} video={video} />)}</ul>
      </div>
    </>
  );
}
