import { youtubeMockUpClient } from '@/service/YoutubeV3Client';
import { VideoItem, VideoId } from '@/domain/Video';

type NewsListRes = {
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

const getNewsList = async (): Promise<NewsListRes> =>
  await youtubeMockUpClient.get<NewsListRes>('/data/k_news.json').then((response) => response.data);

const api = { getNewsList };

export default api;
