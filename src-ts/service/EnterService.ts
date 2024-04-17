import { youtubeMockUpClient } from '@/service/YoutubeV3Client';
import { VideoItem, VideoId } from '@/domain/Video';

type EnterListRes = {
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

const getEnterList = async (): Promise<EnterListRes> =>
  await youtubeMockUpClient
    .get<EnterListRes>('/data/k_entertainment.json')
    .then((response) => response.data);

const api = { getEnterList };

export default api;
