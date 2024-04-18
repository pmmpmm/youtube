import { youtubeV3Client } from '@/service/YoutubeV3Client';
import { Params } from '@/domain/Params';
import { VideoItem } from '@/domain/Video';

type SearchListRes = {
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

const getSearchList = async (keyword: string): Promise<SearchListRes> =>
  // await youtubeV3Client
  //   .get<SearchListRes>('search', { params: { maxResults: 1, q: keyword } } as Params)
  //   .then((response) => response.data);
  await youtubeMockUpClient
    .get<SearchListRes>('/data/keyword_bts.json')
    .then((response) => response.data);

const api = { getSearchList };

export default api;
