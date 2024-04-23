import { VideoItem } from "@/domain/Video";
import VideoCard from "@/components/ui/VideoCard";

const VideoCardContainer = ({ videos }: { videos: VideoItem[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((item, index) => (
        <VideoCard key={`videoCard-${index}`} video={item} />
      ))}
    </ul>
  );
};

export default VideoCardContainer;
