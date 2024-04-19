import axios, { AxiosResponse } from 'axios';

const YOUTUBE_KEY = import.meta.env.VITE_APP_YOUTUBE_KEY;

export const youtubeV3Client = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: YOUTUBE_KEY,
    type: 'video',
  },
});

export const youtubeMockUpClient = axios.create();
