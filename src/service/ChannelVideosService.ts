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

const getChannelVideosList = async (channelId: string): Promise<ChannelVideosRes> =>
  await youtubeV3Client
    .get<ChannelVideosRes>("search", { params: { maxResults: 6, channelId } } as YoutubeReq)
    .then((response) => response.data);
// await youtubeMockUpClient
//   .get<ChannelVideosRes>('/data/channel_videos.json')
//   .then((response) => response.data);

const api = { getChannelVideosList };

export default api;
