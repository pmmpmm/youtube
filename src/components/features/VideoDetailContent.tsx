import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ChannelDetailService from "@/service/ChannelDetailService";
import ChannelVideosService from "@/service/ChannelVideosService";
import { VideoItem } from "@/domain/Video";
import { regexReplace } from "@/common/RegexUtil";
import { getVideoIdOrChannelId } from "@/common/VideoUtil";
import VideoThumbList from "@/components/ui/VideoThumbList";

const VideoDetailContent = () => {
  const location = useLocation();
  const video = location.state.video as VideoItem;
  const id = video.id;
  const { channelId, channelTitle, description, title } = video.snippet;

  const { data: channelDetail } = useQuery({
    queryKey: ["channelDetail", channelId],
    queryFn: ChannelDetailService.getChannelDetail,
    select: (response) => response.items[0]
  });
  const { data: channelVideos } = useQuery({
    queryKey: ["channelVideos", channelId],
    queryFn: ChannelVideosService.getChannelVideosList,
    select: (response) => {
      const items = response.items.map((item) => ({
        ...item,
        id: getVideoIdOrChannelId(item)
      })) as VideoItem[];
      return items;
    }
  });

  return (
    <>
      <div className="flex flex-col m-auto lg:flex-row lg:gap-x-6 xl:max-w-screen-xl">
        <div className="w-full lg:w-2/3 md:min-w-[640px]">
          <iframe
            id="player"
            title="YouTube video player"
            allow="fullscreen"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`}
            className="w-full aspect-video rounded-2xl overflow-hidden"
          ></iframe>
          <div className="pt-6">
            <p className="text-xl font-bold text-base-100 dark:font-semibold">{regexReplace(title)}</p>
            <div className="flex items-center pt-3 pb-8">
              <div className="flex-initial w-11 h-11 rounded-full overflow-hidden relative after:block after:w-full after:h-full after:rounded-full after:rounded-br-full after:absolute after:top-0 after:left-0 after:shadow-[inset_-1px_-1px_4px_rgba(0,0,0,0.1)]">
                <img
                  src={channelDetail && channelDetail.snippet.thumbnails.default.url}
                  alt="채널 섬네일 이미지"
                  className="w-full h-full rounded-full"
                />
              </div>
              <p className="pl-2 text-sm font-medium text-base-100 dark:font-normal">{channelTitle}</p>
            </div>
            <div className="text-base">
              <p className="tx font-medium text-base-100 dark:font-normal">{description}</p>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-y-3 w-full mt-8 pt-8 border-t border-base-800 lg:w-1/3 lg:mt-0 lg:pt-0 lg:border-t-0">
          {channelVideos && channelVideos.map((item, index) => <VideoThumbList key={`video-${index}`} video={item} />)}
        </ul>
      </div>
    </>
  );
};

export default VideoDetailContent;
