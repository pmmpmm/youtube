import { VideoItem } from "@/domain/Video"
import youtubeV3Client from "./YoutubeV3Client"

export type PopularListRes = {
  kind: string,
  etag: string,
  items: VideoItem[]
}

const getPopularList = async (): Promise<PopularListRes> => 
  await youtubeV3Client.get<PopularListRes>("/data/most_popular.json")
    .then((response) => response.data)

export default {
  getPopularList
}