import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import NewsService from '@/service/NewsService';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';
import { getVideoIdOrChannelId } from '@/common/VideoUtil';
import VideoCardContainer from '@/components/ui/VideoCardContainer';
import VideoCard from '@/components/ui/VideoCard';

const NewsVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['newsList'],
    queryFn: NewsService.getNewsList,
    select: (response) => {
      const items = response.items.map((item) => ({
        ...item,
        id: getVideoIdOrChannelId(item)
      })) as VideoItem[];
      return items;
    },
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      <VideoCardContainer>
        {data && data.map((item, index) => <VideoCard key={`news-${index}`} video={item} />)}
      </VideoCardContainer>
    </>
  );
};

export default NewsVideosContent;
