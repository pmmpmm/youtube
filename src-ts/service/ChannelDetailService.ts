import { youtubeV3Client, youtubeMockUpClient } from '@/service/YoutubeV3Client';
import { Params } from '@/domain/Params';
import { ChannelDatailItem } from '@/domain/ChannelDetail';

type ChannelDetailRes = {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ChannelDatailItem[];
};

const getChannelDetail = async (channelId: string): Promise<ChannelDetailRes> =>
  // await youtubeV3Client
  //   .get<ChannelDetailRes>('channels', { params: { id: channelId } } as Params)
  //   .then((response) => response.data);
  await youtubeMockUpClient
    .get<ChannelDetailRes>('/data/channel_details.json')
    .then((response) => response.data);

const api = { getChannelDetail };

export default api;
