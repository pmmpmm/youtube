import axios from 'axios';
import Youtube from './youtube';

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const httpClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  timeout: 1000,
  params: {
    part: 'snippet',
    key: YOUTUBE_KEY,
  },
});

const youtubeApi = {
  search: async function (params) {
    return await httpClient.get('search', params);
  },
  videos: async function (params) {
    return await httpClient.get('videos', params);
  },
};
export const youtubeClient = new Youtube(youtubeApi);
