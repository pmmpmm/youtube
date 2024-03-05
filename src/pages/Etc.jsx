import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useNavContext } from '../context/NavContext';
import Loading from '../components/Loading/Loading';
import Error from '../components/ErrorComponent/Error';
import VideoCard from '../components/VideoCard/VideoCard';

export default function Etc() {
  const { youtube } = useYoutubeApi();
  const { navMenu } = useNavContext();

  const getEtc = ({ queryKey }) => {
    return youtube.etc(queryKey[1]);
  };

  // Q1 : nav의 '음악' 혹은 '예능' 클릭 시 컨텐츠 전환
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getEtc', navMenu],
    queryFn: getEtc,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {videos && (
        <ul className={`videos`}>
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video} />;
          })}
        </ul>
      )}
    </>
  );
}
