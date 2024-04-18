import { useQuery } from '@tanstack/react-query';
import PopularService from '@/service/PopularService';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';
import VideoCardContainer from '@/components/ui/VideoCardContainer';
import VideoCard from '@/components/ui/VideoCard';

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
      <VideoCardContainer>
        {data && data.map((item) => <VideoCard key={item.id} video={item} />)}
      </VideoCardContainer>
    </>
  );
};

export default PopularVideosContent;
