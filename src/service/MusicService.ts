import { youtubeMockUpClient } from "@/service/YoutubeV3Client";
import { VideoItem } from "@/domain/Video";

type MusicListRes = {
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

const getMusicList = async (): Promise<MusicListRes> =>
  await youtubeMockUpClient.get<MusicListRes>("/data/k_pop_music.json").then((response) => response.data);

const api = { getMusicList };

export default api;
