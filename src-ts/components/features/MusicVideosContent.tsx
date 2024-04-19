import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import MusicService from '@/service/MusicService';
import VideoCard from '@/components/ui/VideoCard';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';

const MusicVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['musicList'],
    queryFn: MusicService.getMusicList,
    select: (response) => {
      const items = response.items.map((item) => ({
        ...item,
        id: item.id.videoId ? item.id.videoId : item.id.playlistId,
      })) as VideoItem<string>[];
      return items;
    },
  });

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      <ul className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
        {data && data.map((item) => <VideoCard key={item.id} video={item} style='' />)}
      </ul>
    </>
  );
};

export default MusicVideosContent;
