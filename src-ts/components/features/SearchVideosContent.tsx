import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import SearchService from '@/service/SearchService';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';
import { getVideoIdOrChannelId } from '@/common/VideoUtil';
import VideoListContainer from '@/components/ui/VideoListContainer';

const SearchVideosContent = () => {
  const { keyword = '' } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['searchList', keyword],
    queryFn: () => SearchService.getSearchList(keyword),
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
      {error && <Error />}
      {isLoading && <Loading />}
      {data && <VideoListContainer videos={data} />}
    </>
  );
};

export default SearchVideosContent;
