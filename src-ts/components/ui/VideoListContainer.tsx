import { VideoItem } from '@/domain/Video';
import VideoList from '@/components/ui/VideoList';

const VideoListContainer = ({ videos }: { videos: VideoItem[] }) => {
  return (
    <ul className='grid grid-cols-1 gap-y-4 max-w-6xl m-auto'>
      {videos.map((item, index) => (
        <VideoList key={`videoList-${index}`} video={item} />
      ))}
    </ul>
  );
};

export default VideoListContainer;
