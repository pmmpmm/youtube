import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { VideoItem } from "@/domain/Video";
import SearchService from "@/service/SearchService";
import Error from "@/components/features/Error";
import Loading from "@/components/features/Loading";
import { getVideoIdOrChannelId } from "@/common/VideoUtil";
import VideoListContainer from "@/components/ui/VideoListContainer";

const SearchVideosContent = () => {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("searchQuery") as string;

  const { isLoading, error, data } = useQuery({
    queryKey: ["searchList", keyword],
    queryFn: SearchService.getSearchList,
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
      {error && <Error />}
      {isLoading && <Loading />}
      {data && <VideoListContainer videos={data} />}
    </>
  );
};

export default SearchVideosContent;
