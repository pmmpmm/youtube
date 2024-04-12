import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { useYoutubeApi } from '@/context/YoutubeApiContext';
import VideoCard from '@/components/ui/VideoCard';

const Videos = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const getVideos = ({ queryKey }: QueryFunctionContext<[string, string | undefined]>) => {
    return youtube.videos(queryKey[1]);
  };
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: getVideos,
  });

  return (
    <>
      {error && <p>error</p>}
      {isLoading && <p>isLoading</p>}
      <ul
        className={`grid grid-cols-1 ${
          keyword
            ? ' gap-y-4 max-w-6xl m-auto'
            : ' gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'
        }`}
      >
        {videos &&
          videos.map((item: any) => (
            <VideoCard key={item.id} video={item} style={`${keyword ? 'list' : ''}`} />
          ))}
      </ul>
    </>
  );
};

export default Videos;
