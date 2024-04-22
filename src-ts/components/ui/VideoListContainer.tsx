import { VideoItem } from '@/domain/Video';
import VideoList from '@/components/ui/VideoList';

const VideoListContainer = ({ videos }: { videos: VideoItem<string>[] }) => {
  return (
    <ul className='grid grid-cols-1 gap-y-4 max-w-6xl m-auto'>
      {videos.map((item) => (
        <VideoList key={item.id} video={item} />
      ))}
    </ul>
  );
};

export default VideoListContainer;
