import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../components/Loading';
import Error from '../components/Error';
import VideoList from '../components/VideoList';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { id } = video;
  const { channelId, channelTitle, description, title } = video.snippet;

  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['channelVideos'],
    queryFn: async () => {
      const items = await axios('/data/channel_videos.json') //
        .then((res) => res.data.items);
      return items;
    },
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {videos && (
        <>
          <div>
            <iframe id='player' type='text/html' title='YouTube video player' width='640' height='360' allow='fullscreen' src={`http://www.youtube.com/embed/${id}?autoplay=1&mute=1`}></iframe>
            <div>
              <p>{title}</p>
              <div>
                <p>{channelTitle}</p>
                <p>id : {channelId}</p>
              </div>
              <div>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <ul>{videos && videos.map((video) => <VideoList key={video.id} video={video} />)}</ul>
        </>
      )}
    </>
  );
}
