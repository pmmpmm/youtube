import { Link } from "react-router-dom";
import { VideoItem } from "@/domain/Video";
import { regexReplace } from "@/common/RegexUtil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const VideoThumbList = ({ video }: { video: VideoItem }) => {
  const { id } = video;
  const { title, publishedAt, thumbnails, channelTitle } = video.snippet;

  return (
    <li className="video w-full">
      <Link to={`/videos/watch?v=${id}`} state={{ video }} className="flex gap-x-2 w-full">
        <div className="thumbnail lex-none min-w-[10.5rem]">
          <div className="thumbnailBox w-full rounded-lg overflow-hidden aspect-video">
            <img src={thumbnails.default.url} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        <div className="info flex-initial">
          <p className="title text-sm font-semibold leading-5 line-clamp-2 text-base-100 dark:font-semibold">
            {regexReplace(title)}
          </p>
          <p className="channelTitle pt-2 text-xs font-normal text-base-500">{channelTitle}</p>
          <p className="publishedAt text-xs font-normal text-base-500">{dayjs(publishedAt).fromNow()}</p>
        </div>
      </Link>
    </li>
  );
};

export default VideoThumbList;
