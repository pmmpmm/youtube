import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { useYoutubeApi } from '@/context/YoutubeApiContext';
import VideoCard from '@/components/ui/VideoCard';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';

const NavVideos = () => {
  const { navName } = useParams();
  const { youtube } = useYoutubeApi();

  const getVideos = ({ queryKey }: QueryFunctionContext<[string, string | undefined]>) => {
    return youtube.navVideos(queryKey[1]);
  };
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', navName],
    queryFn: getVideos,
  });

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      <ul
        className={
          'grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'
        }
      >
        {videos && videos.map((item: any) => <VideoCard key={item.id} video={item} style={``} />)}
      </ul>
    </>
  );
};

export default NavVideos;
