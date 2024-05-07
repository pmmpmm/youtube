import { youtubeV3Client, YoutubeReq } from "@/service/YoutubeV3Client";
import { VideoItem } from "@/domain/Video";

type ChannelVideosRes = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
};

const getChannelVideosList = async ({ queryKey }: any): Promise<ChannelVideosRes> =>
  await youtubeV3Client
    .get<ChannelVideosRes>("search", { params: { maxResults: 6, channelId: queryKey[1] } } as YoutubeReq)
    .then((response) => response.data);

const api = { getChannelVideosList };

export default api;
