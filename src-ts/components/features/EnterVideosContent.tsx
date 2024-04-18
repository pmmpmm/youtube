import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import EnterService from '@/service/EnterService';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';
import { getVideoIdOrChannelId } from '@/common/VideoUtil';
import VideoCardContainer from '@/components/ui/VideoCardContainer';
import VideoCard from '@/components/ui/VideoCard';

const EnterVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['enterList'],
    queryFn: EnterService.getEnterList,
    select: (response) => {
      const items = response.items.map((item) => ({
          ...item,
          id: getVideoIdOrChannelId(item)
        })
      ) as VideoItem[];
      
      return items;
    },
  });

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      <VideoCardContainer>
        {data && data.map((item, index) => <VideoCard key={`enter-${index}`} video={item} />)}
      </VideoCardContainer>
    </>
  );
};

export default EnterVideosContent;
