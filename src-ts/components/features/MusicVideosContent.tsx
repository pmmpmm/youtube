import { useQuery } from '@tanstack/react-query';
import { VideoItem } from '@/domain/Video';
import MusicService from '@/service/MusicService';
import Error from '@/components/features/Error';
import Loading from '@/components/features/Loading';
import { getVideoIdOrPlaylistId } from '@/common/VideoUtil';
import VideoCardContainer from '@/components/ui/VideoCardContainer';

const MusicVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['musicList'],
    queryFn: MusicService.getMusicList,
    select: (response) => {
      const items = response.items.map((item) => ({
        ...item,
        id: getVideoIdOrPlaylistId(item)
      })) as VideoItem[];
      return items;
    },
  });

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      {data && <VideoCardContainer videos={data} />}
    </>
  );
};

export default MusicVideosContent;
