import { useQuery } from '@tanstack/react-query';
import PopularService from '@/service/PopularService';
import VideoCard from '@/components/ui/VideoCard';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';

const PopularVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['popularList'],
    queryFn: PopularService.getPopularList,
    select: (response) => {
      return response.items;
    },
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      <ul className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
        {data && data.map((item) => <VideoCard key={item.id} video={item} style='' />)}
      </ul>
    </>
  );
};

export default PopularVideosContent;
