import { youtubeV3Client, youtubeMockUpClient } from '@/service/YoutubeV3Client';
import { Params } from '@/domain/Params';
import { VideoItem, VideoId } from '@/domain/Video';

type ChannelVideosRes = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem<VideoId>[];
};

const getChannelVideosList = async (channelId: string): Promise<ChannelVideosRes> =>
  await youtubeV3Client
    .get<ChannelVideosRes>('search', { params: { maxResults: 6, channelId } } as Params)
    .then((response) => response.data);
//   return await youtubeMockUpClient
//     .get<ChannelVideosRes>('/data/channel_videos.json')
//     .then((response) => response.data)

const api = { getChannelVideosList };

export default api;
