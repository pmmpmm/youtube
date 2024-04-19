import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import EnterService from '@/service/EnterService';
import VideoCard from '@/components/ui/VideoCard';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';

const EnterVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['enterList'],
    queryFn: EnterService.getEnterList,
    select: (response) => {
      const items = response.items.map((item) => ({
          ...item,
          id: typeof item.id === "string" ? item.id : item.id.channelId
        })
      ) as VideoItem[];
      
      return items;
    },
  });

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      <ul className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
        {data && data.map((item, index) => <VideoCard key={`enter-${index}`} video={item} style='' />)}
      </ul>
    </>
  );
};

export default EnterVideosContent;
