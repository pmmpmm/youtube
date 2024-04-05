import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import Loading from '../components/Loading';
import Error from '../components/Error';
import VideoCard from '../components/VideoCard/VideoCard';

export default function Search() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const getSearch = ({ queryKey }) => {
    return youtube.search(queryKey[1]);
  };

  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: getSearch,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {videos && (
        <ul className={`videos ${keyword ? 'list' : ''}`}>
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video} style={`${keyword ? 'list' : ''}`} />;
          })}
        </ul>
      )}
    </>
  );
}
