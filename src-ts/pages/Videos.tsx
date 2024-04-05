import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import VideoCard from '@/components/ui/VideoCard/VideoCard';
import { useYoutubeApi } from '@/context/YoutubeApiContext';

const Videos = () => {
  const { youtube } = useYoutubeApi();
  const { keyword } = useParams();

  const getVideos = ({
    queryKey,
  }: QueryFunctionContext<[string, string | null | undefined]>) => {
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
        // 폴더 구조 변경으로 module.css 생성 대신 tailwindcss 사용
        // tailwindcss 조건 사용 테스트
        className={` ${
          keyword
            ? 'grid grid-cols-1 gap-y-4 max-w-6xl m-auto sm:grid grid-cols-1 lg:grid grid-cols-1 2xl:grid grid-cols-1'
            : 'grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'
        }`}
      >
        {videos &&
          videos.map((item: any) => (
            <VideoCard
              key={item.id}
              video={item}
              style={`${keyword ? 'list' : ''}`}
            />
          ))}
      </ul>
    </>
  );
};

export default Videos;
