import { youtubeMockUpClient } from "@/service/YoutubeV3Client";
import { VideoItem } from "@/domain/Video";

export type PopularListRes = {
  kind: string;
  etag: string;
  items: VideoItem[];
};

const getPopularList = async (): Promise<PopularListRes> =>
  await youtubeMockUpClient.get<PopularListRes>("/data/most_popular.json").then((response) => response.data);

const api = { getPopularList };

export default api;
