import axios from "axios";

const YOUTUBE_KEY = import.meta.env.VITE_APP_YOUTUBE_KEY;

export type YoutubeReq = {
  params: { id?: string; maxResults?: number; q?: string; channelId?: string };
};

export const youtubeV3Client = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    key: YOUTUBE_KEY,
    type: "video"
  }
});

export const youtubeMockUpClient = axios.create();
